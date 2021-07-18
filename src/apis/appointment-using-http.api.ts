import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { StatusCodes } from 'http-status-codes'
import { Appointment } from '../types'
import {
	AppointmentApi,
	CreateAppointmentRequest,
	DeleteAppointmentRequest,
	GetAppointByIdRequest,
	GetAppointsRequest,
	UpdateAppointmentRequest,
	UpdateAppointmentResponse,
} from './appointment.api'
import { ApiException } from './exceptions'

type RawAppointment = {}

type GetAppointmentsResponse = {
	data: Array<RawAppointment>
}

type GetAppointmentByIdResponse = RawAppointment

export class AppointmentApiUsingHttp implements AppointmentApi {
	private readonly baseUrl = 'localhost:8000/appointments'

	async updateAppointment(request: UpdateAppointmentRequest): Promise<UpdateAppointmentResponse> {
		try {
			const response = await axios.put<void>(this.buildUrl('/' + request.id), request)

			if (response.status === StatusCodes.OK) {
				return {
					date: request.date,
					description: request.description,
					time: request.time,
				}
			}
			throw new ApiException(`Could not update appointment. Request: ${request}; Response: ${response}`)
		} catch (err) {
			throw new ApiException('updateAppointment failed', err)
		}
	}

	async deleteAppointment(request: DeleteAppointmentRequest): Promise<void> {
		try {
			const response = await axios.put<void>(this.buildUrl('/' + request.appointmentId))

			if (response.status === StatusCodes.OK) {
				return
			}
			throw new ApiException(`Could not delete appointment. Request: ${request}; Response: ${response}`)
		} catch (err) {
			throw new ApiException('deleteAppointment failed', err)
		}
	}

	async createAppointment(request: CreateAppointmentRequest): Promise<Appointment> {
		try {
			const response = await axios.put<void>(this.buildUrl('/'), {})

			if (response.status === StatusCodes.CREATED) {
				return {
					id: uuidv4(),
					date: request.date,
					description: request.description,
					time: request.time,
				}
			}
			throw new ApiException(`Could not update appointment. Request: ${request}; Response: ${response}`)
		} catch (err) {
			throw new ApiException('updateAppointment failed', err)
		}
	}

	async getAppointments(request: GetAppointsRequest): Promise<Array<Appointment>> {
		try {
			const response = await axios.get<Partial<GetAppointmentsResponse>>(this.buildUrl('/', request))

			if (response.status === StatusCodes.OK) {
				return []
			}
			throw new ApiException(`Could not get appoints. Request: ${response}; Response: ${response}`)
		} catch (err) {
			throw new ApiException('getAppointments failed', err)
		}
	}

	async getAppointmentById(request: GetAppointByIdRequest): Promise<Appointment> {
		try {
			const response = await axios.get<Partial<GetAppointmentByIdResponse>>(this.buildUrl())

			if (response.status === StatusCodes.OK) {
				return null as unknown as Appointment
			}
			throw new ApiException(`Could not get appoints. Request: ${response}; Response: ${response}`)
		} catch (err) {
			throw new ApiException('getAppointmentById failed', err)
		}
	}

	private buildUrl(path: string = '/', params?: Record<string, string | number>): string {
		const url = new URL(this.baseUrl + path)

		if (params) Object.entries(params).forEach(([name, value]) => url.searchParams.append(name, value.toString()))

		return url.href
	}
}
