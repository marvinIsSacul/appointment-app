import { bootstrap } from '../bootstrap.appointment-service'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { DeleteAppointmentErrorResponse, DeleteAppointmentResponse } from '../../common/types'
import { InputException } from '../../common/exceptions'

export async function handler(
	request: Request,
	response: Response<DeleteAppointmentErrorResponse | DeleteAppointmentResponse>,
): Promise<void> {
	const service = bootstrap()

	try {
		const { id } = request.params

		if (!id) {
			throw new InputException('Appointment id not specified')
		}

		await service.deleteAppointmentById({
			id,
		})

		response.status(StatusCodes.OK).send()
	} catch (err) {
		console.error(err)
		response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: 'Internal service error. Please check logs',
		})
	}
}
