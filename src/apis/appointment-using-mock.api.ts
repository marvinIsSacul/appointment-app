import { v4 as uuidv4 } from 'uuid'
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

export class AppointmentApiUsingMock implements AppointmentApi {
	async updateAppointment(request: UpdateAppointmentRequest): Promise<UpdateAppointmentResponse> {
		if (request.id === '00:00') {
			throw new ApiException('Error updating an Appointment.')
		}

		return {
			date: '2019-12-1',
		}
	}

	async deleteAppointment(request: DeleteAppointmentRequest): Promise<void> {
		if (request.appointmentId === '00:00') {
			throw new ApiException('Error deleting an Appointment.')
		}
	}

	async createAppointment(request: CreateAppointmentRequest): Promise<Appointment> {
		if (request.time === '00:00') {
			throw new ApiException('Error creating a new Appointment.')
		}

		return {
			date: '2019-12-1',
			description: 'New Description.',
			id: uuidv4(),
			time: '12:00',
		}
	}

	async getAppointments(request: GetAppointsRequest): Promise<Array<Appointment>> {
		if (request.limit === 0 && request.offset === 0) {
			throw new ApiException('Error getting an Appointment.')
		}

		return [
			{
				date: '2021-11-2',
				description: 'Hello',
				id: uuidv4(),
				time: '08:43',
			},
			{
				date: '2019-12-1',
				description: 'World',
				id: uuidv4(),
				time: '11:01',
			},
		]
	}

	async getAppointmentById(request: GetAppointByIdRequest): Promise<Appointment> {
		if (request.appointmentId === '00:00') {
			throw new ApiException('Error getting Appointments.')
		}

		return {
			date: '2019-12-1',
			description: 'Hello',
			id: uuidv4(),
			time: '12:43',
		}
	}
}
