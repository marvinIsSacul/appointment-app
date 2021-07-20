import { Exception } from './types'

export class InputException extends Exception {
	constructor(message: string, cause?: Exception | Error) {
		super(message, cause)
		this.name = 'InputException'
	}
}
