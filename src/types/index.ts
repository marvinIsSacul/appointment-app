export type Appointment = {
	id: string
	description: string
	time: string
	date: string
}

export class Exception extends Error {
	cause: Exception | Error | null
	time: string

	constructor(message: string, cause?: Error | Exception) {
		super(message)
		this.name = 'Exception'
		this.time = new Date().toISOString()
		if (cause) {
			this.cause = cause
		} else {
			this.cause = null
		}
	}
	getStackTrace() {
		return this.buildStackTrace(this)
	}
	toString() {
		return this.getStackTrace()
	}
	buildStackTrace(e: Exception | Error): string {
		const stacktrace = []
		stacktrace.push(`${e.stack}`)
		if (e instanceof Exception && e.cause) {
			stacktrace.push(`Caused by [${e.time}] ${this.buildStackTrace(e.cause)}`)
		}
		return stacktrace.join('\n')
	}
}
