import { Exception } from '../types'

export class ApiException extends Exception {
	constructor(message: string, cause?: Exception | Error) {
		super(message, cause)
		this.name = 'ApiException'
	}
}
