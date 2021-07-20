import { Appointment } from '../../common/types'

export type CreateAppointmentRequest = Pick<Appointment, 'date' | 'description' | 'time'>
export type DeleteAppointmentByIdRequest = Pick<Appointment, 'id'>
export type GetAppointmentByIdRequest = Pick<Appointment, 'id'>
export type UpdateAppointmentByIdRequest = Pick<Appointment, 'id'> & Partial<Omit<Appointment, 'id'>>
export type GetAppointmentsRequest = {
	limit?: number
	offset?: number
}

export interface AppointmentService {
	createAppointment(request: CreateAppointmentRequest): Promise<Appointment>
	getAppointments(request: GetAppointmentsRequest): Promise<Array<Appointment>>
	deleteAppointmentById(request: DeleteAppointmentByIdRequest): Promise<void>
	getAppointmentById(request: GetAppointmentByIdRequest): Promise<Appointment | null>
	updateAppointmentById(request: UpdateAppointmentByIdRequest): Promise<Partial<Pick<Appointment, 'id'>>>
}
