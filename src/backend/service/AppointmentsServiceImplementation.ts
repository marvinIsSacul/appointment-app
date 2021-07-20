import { Appointment } from '../../common/types'
import { AppointmentRepository } from '../repository'
import {
	AppointmentService,
	CreateAppointmentRequest,
	DeleteAppointmentByIdRequest,
	GetAppointmentByIdRequest,
	GetAppointmentsRequest,
	UpdateAppointmentByIdRequest,
} from './AppointmentsService'
import { AppointmentsServiceException } from './exceptions'

export class AppointmentsServiceImplementation implements AppointmentService {
	constructor(private readonly repository: AppointmentRepository) {}

	async createAppointment(request: CreateAppointmentRequest): Promise<Appointment> {
		try {
			const appointment = await this.repository.createAppointment({
				date: request.date,
				time: request.time,
				description: request.description,
			})

			return appointment
		} catch (err) {
			throw new AppointmentsServiceException('Could not create appointment', err)
		}
	}

	async getAppointments(request: GetAppointmentsRequest): Promise<Appointment[]> {
		try {
			return await this.repository.getAppointments({
				limit: request.limit,
				offset: request.offset,
			})
		} catch (err) {
			throw new AppointmentsServiceException('Could not get appointments', err)
		}
	}

	async deleteAppointmentById(request: DeleteAppointmentByIdRequest): Promise<void> {
		try {
			return await this.repository.deleteAppointmentById({
				id: request.id,
			})
		} catch (err) {
			throw new AppointmentsServiceException('Could not delete appointment', err)
		}
	}

	async getAppointmentById(request: GetAppointmentByIdRequest): Promise<Appointment | null> {
		try {
			return await this.repository.getAppointmentById({
				id: request.id,
			})
		} catch (err) {
			throw new AppointmentsServiceException('Could not get appointment', err)
		}
	}

	async updateAppointmentById(request: UpdateAppointmentByIdRequest): Promise<Partial<Pick<Appointment, 'id'>>> {
		try {
			return await this.repository.updateAppointmentById({
				id: request.id,
				date: request.date,
				description: request.description,
				time: request.time,
			})
		} catch (err) {
			throw new AppointmentsServiceException('Could not update appointment', err)
		}
	}
}
