import { join } from 'path'
import { AppointmentRepositoryUsingSQLite } from './repository'
import { AppointmentService, AppointmentsServiceImplementation } from './service'

export function bootstrap(): AppointmentService {
	const repository = new AppointmentRepositoryUsingSQLite(join(__dirname, 'db/ExpressApp.db'))
	return new AppointmentsServiceImplementation(repository)
}
