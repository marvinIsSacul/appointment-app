import axios from 'axios'
import { StatusCodes } from 'http-status-codes'
import {
	Appointment,
	CreateAppointmentResponse,
	GetAppointmentsResponse,
	UpdateAppointmentResponse,
	GetAppointmentResponse,
} from '../common/types'
import {
	AppointmentApi,
	CreateAppointmentRequest,
	DeleteAppointmentRequest,
	GetAppointByIdRequest,
	GetAppointsRequest,
	UpdateAppointmentRequest,
} from './appointment.api'
import { ApiException } from './exceptions'
import { assemble } from '../common/util'

export class AppointmentApiUsingHttp implements AppointmentApi {
	private readonly baseUrl = 'http://localhost:8181/appointments'

	async updateAppointment(request: UpdateAppointmentRequest): Promise<Partial<Appointment>> {
		try {
			const response = await axios.put<UpdateAppointmentResponse>(this.buildUrl('/' + request.id), request)

			if (response.status === StatusCodes.OK) {
				return {
					id: request.id,
					...response.data,
				}
			}
			throw new ApiException(
				`Could not update appointment. Request: ${JSON.stringify(request)}; Response: ${JSON.stringify(response)}`,
			)
		} catch (err) {
			console.error(err)
			throw new ApiException('updateAppointment failed', err)
		}
	}

	async deleteAppointment(request: DeleteAppointmentRequest): Promise<void> {
		try {
			const response = await axios.delete<void>(this.buildUrl('/' + request.appointmentId))

			if (response.status === StatusCodes.OK) {
				return
			}
			throw new ApiException(
				`Could not delete appointment. Request: ${JSON.stringify(request)}; Response: ${JSON.stringify(response)}`,
			)
		} catch (err) {
			console.error(err)
			throw new ApiException('deleteAppointment failed', err)
		}
	}

	async createAppointment(request: CreateAppointmentRequest): Promise<Appointment> {
		try {
			const response = await axios.post<CreateAppointmentResponse>(this.buildUrl('/'), request)

			if (response.status === StatusCodes.CREATED) {
				return assemble<Appointment>(response.data.data, [
					{
						key: 'createdAt',
						required: true,
						validator: (val) => typeof val === 'string' && val.length > 0,
					},
					{
						key: 'date',
						required: true,
						validator: (val) => typeof val === 'string' && val.length > 0,
					},
					{
						key: 'description',
						required: true,
						validator: (val) => typeof val === 'string' && val.length > 0,
					},
					{
						key: 'id',
						required: true,
						validator: (val) => typeof val === 'string' && val.length > 0,
					},
					{
						key: 'time',
						required: true,
						validator: (val) => typeof val === 'string' && val.length > 0,
					},
					{
						key: 'updatedAt',
						required: true,
						validator: (val) => typeof val === 'string' && val.length > 0,
					},
				])
			}
			throw new ApiException(
				`Could not update appointment. Request: ${JSON.stringify(request)}; Response: ${JSON.stringify(response)}`,
			)
		} catch (err) {
			console.error(err)
			throw new ApiException('updateAppointment failed', err)
		}
	}

	async getAppointments(request: GetAppointsRequest): Promise<Array<Appointment>> {
		try {
			const response = await axios.get<GetAppointmentsResponse>(this.buildUrl('/', request))

			if (response.status === StatusCodes.OK) {
				if (!Array.isArray(response.data.data)) {
					throw new ApiException(
						`Response data is not array. Request: ${JSON.stringify(request)}; Response: ${JSON.stringify(response)}`,
					)
				}

				const appointments = response.data.data.map<Appointment>((result) =>
					assemble<Appointment>(result, [
						{
							key: 'createdAt',
							required: true,
							validator: (value) => typeof value === 'string' && value.length > 0,
						},
						{
							key: 'date',
							required: true,
							validator: (value) => typeof value === 'string' && value.length > 0,
						},
						{
							key: 'description',
							required: true,
							validator: (value) => typeof value === 'string' && value.length > 0,
						},
						{
							key: 'id',
							required: true,
							validator: (value) => typeof value === 'string' && value.length > 0,
						},
						{
							key: 'time',
							required: true,
							validator: (value) => typeof value === 'string' && value.length > 0,
						},
						{
							key: 'updatedAt',
							required: true,
							validator: (value) => typeof value === 'string' && value.length > 0,
						},
					]),
				)

				return appointments
			}
			throw new ApiException(`Could not get appointments. Request: ${request}; Response: ${JSON.stringify(response)}`)
		} catch (err) {
			console.error(err)
			throw new ApiException('getAppointments failed', err)
		}
	}

	async getAppointmentById(request: GetAppointByIdRequest): Promise<Appointment> {
		try {
			const response = await axios.get<GetAppointmentResponse>(this.buildUrl('/' + request.appointmentId))

			if (response.status === StatusCodes.OK) {
				const appointment = assemble<Appointment>(response.data.data, [
					{
						key: 'createdAt',
						required: true,
						validator: (val) => typeof val === 'string' && val.length > 0,
					},
					{
						key: 'date',
						required: true,
						validator: (val) => typeof val === 'string' && val.length > 0,
					},
					{
						key: 'description',
						required: true,
						validator: (val) => typeof val === 'string' && val.length > 0,
					},
					{
						key: 'id',
						required: true,
						validator: (val) => typeof val === 'string' && val.length > 0,
					},
					{
						key: 'time',
						required: true,
						validator: (val) => typeof val === 'string' && val.length > 0,
					},
					{
						key: 'updatedAt',
						required: true,
						validator: (val) => typeof val === 'string' && val.length > 0,
					},
				])

				return appointment
			}
			throw new ApiException(
				`Could not get appointment. Request: ${JSON.stringify(request)}; Response: ${JSON.stringify(response)}`,
			)
		} catch (err) {
			console.error(err)
			throw new ApiException('getAppointmentById failed', err)
		}
	}

	private buildUrl(path: string = '/', params?: Record<string, string | number>): string {
		const url = new URL(this.baseUrl + path)

		if (params) Object.entries(params).forEach(([name, value]) => url.searchParams.append(name, value.toString()))

		return url.href
	}
}
