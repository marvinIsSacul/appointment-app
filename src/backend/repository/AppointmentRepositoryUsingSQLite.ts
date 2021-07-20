import { Appointment } from '../../common/types'
import { assemble } from '../../common/util'
import {
	AppointmentRepository,
	CreateAppointmentRequest,
	DeleteAppointmentByIdRequest,
	GetAppointmentByIdRequest,
	GetAppointmentsRequest,
	UpdateAppointmentByIdRequest,
} from './AppointmentRepository'
import knex, { Knex } from 'knex'
import { v4 as uuidv4 } from 'uuid'
import { AppointmentsRepositoryException } from './exceptions'

export class AppointmentRepositoryUsingSQLite implements AppointmentRepository {
	private readonly conn: Knex

	constructor(private readonly dbFileName: string, private readonly dbTableName = 'Appointments') {
		this.conn = knex({
			client: 'sqlite3',
			connection: {
				filename: this.dbFileName,
			},
		})
	}

	async createAppointment(request: CreateAppointmentRequest): Promise<Appointment> {
		try {
			const now = new Date().toISOString()
			const appointment: Appointment = {
				id: uuidv4(),
				createdAt: now,
				updatedAt: now,
				date: request.date,
				description: request.description,
				time: request.time,
			}

			await this.conn.table(this.dbTableName).insert(appointment)

			return appointment
		} catch (err) {
			throw new AppointmentsRepositoryException('createAppointment() error', err)
		}
	}
	async getAppointments(request: GetAppointmentsRequest): Promise<Appointment[]> {
		try {
			const results = await this.conn
				.select<Partial<Appointment>[]>()
				.from(this.dbTableName)
				.limit(request.limit ?? 100) // get 100 records by default.
				.offset(request.offset ?? 0)

			const appointments = results.map<Appointment>((result) =>
				assemble<Appointment>(result, [
					{
						key: 'createdAt',
						required: true,
						validator: (value) => typeof value === 'string',
					},
					{
						key: 'date',
						required: true,
						validator: (value) => typeof value === 'string',
					},
					{
						key: 'description',
						required: true,
						validator: (value) => typeof value === 'string',
					},
					{
						key: 'id',
						required: true,
						validator: (value) => typeof value === 'string',
					},
					{
						key: 'time',
						required: true,
						validator: (value) => typeof value === 'string',
					},
					{
						key: 'updatedAt',
						required: true,
						validator: (value) => typeof value === 'string',
					},
				]),
			)

			return appointments
		} catch (err) {
			throw new AppointmentsRepositoryException('getAppointments() error', err)
		}
	}
	async deleteAppointmentById(request: DeleteAppointmentByIdRequest): Promise<void> {
		try {
			await this.conn.table(this.dbTableName).delete().where('id', request.id)
		} catch (err) {
			throw new AppointmentsRepositoryException('deleteAppointmentById() error', err)
		}
	}
	async getAppointmentById(request: GetAppointmentByIdRequest): Promise<Appointment | null> {
		try {
			const results = await this.conn.select<Partial<Appointment[]>>().from(this.dbTableName).where('id', request.id)

			if (results.length === 0) {
				return null
			}

			const appointment = assemble<Appointment>(results[0], [
				{
					key: 'createdAt',
					required: true,
					validator: (value) => typeof value === 'string',
				},
				{
					key: 'date',
					required: true,
					validator: (value) => typeof value === 'string',
				},
				{
					key: 'description',
					required: true,
					validator: (value) => typeof value === 'string',
				},
				{
					key: 'id',
					required: true,
					validator: (value) => typeof value === 'string',
				},
				{
					key: 'time',
					required: true,
					validator: (value) => typeof value === 'string',
				},
				{
					key: 'updatedAt',
					required: true,
					validator: (value) => typeof value === 'string',
				},
			])

			return appointment
		} catch (err) {
			throw new AppointmentsRepositoryException('getAppointmentById() error', err)
		}
	}
	async updateAppointmentById(request: UpdateAppointmentByIdRequest): Promise<Partial<Pick<Appointment, 'id'>>> {
		try {
			const now = new Date().toISOString()
			const appointment: Partial<Appointment> = {
				updatedAt: now,
				date: request.date,
				description: request.description,
				time: request.time,
			}

			await this.conn.table(this.dbTableName).where('id', request.id).update(appointment)

			return {
				id: request.id,
				...appointment,
			}
		} catch (err) {
			throw new AppointmentsRepositoryException('updateAppointmentById() error', err)
		}
	}
}
