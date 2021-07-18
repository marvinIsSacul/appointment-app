import { Appointment } from '../types'

export type CreateAppointmentRequest = Pick<Appointment, 'description' | 'date' | 'time'>
export type DeleteAppointmentRequest = { appointmentId: string }
export type UpdateAppointmentRequest = Partial<Omit<Appointment, 'id'>> & { id: string }
export type UpdateAppointmentResponse = Partial<Omit<Appointment, 'id'>>
export type GetAppointsRequest = {
	offset?: number
	limit?: number
}
export type GetAppointByIdRequest = {
	appointmentId: string
}

export interface AppointmentApi {
	createAppointment(request: CreateAppointmentRequest): Promise<Appointment>
	updateAppointment(request: UpdateAppointmentRequest): Promise<UpdateAppointmentResponse>
	deleteAppointment(request: DeleteAppointmentRequest): Promise<void>
	getAppointments(request: GetAppointsRequest): Promise<Array<Appointment>>
	getAppointmentById(request: GetAppointByIdRequest): Promise<Appointment>
}
