import { Exception } from '../../common/types'

export class AppointmentsServiceException extends Exception {
	constructor(message: string, cause?: Exception | Error) {
		super(message, cause)
		this.name = 'AppointmentsServiceException'
	}
}
