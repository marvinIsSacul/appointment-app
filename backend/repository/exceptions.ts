import { Exception } from '../../common/types'

export class AppointmentsRepositoryException extends Exception {
	constructor(message: string, cause?: Exception | Error) {
		super(message, cause)
		this.name = 'AppointmentsRepositoryException'
	}
}
