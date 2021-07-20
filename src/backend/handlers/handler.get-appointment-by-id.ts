import { bootstrap } from '../bootstrap.appointment-service'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { GetAppointmentErrorResponse, GetAppointmentResponse } from '../../common/types'
import { InputException } from '../../common/exceptions'

export async function handler(
	request: Request,
	response: Response<GetAppointmentErrorResponse | GetAppointmentResponse>,
): Promise<void> {
	const service = bootstrap()

	try {
		const { id } = request.params

		if (!id) {
			throw new InputException('Appointment id not specified')
		}

		const appointment = await service.getAppointmentById({
			id,
		})

		if (appointment === null) {
			response.status(StatusCodes.NOT_FOUND).send({
				message: 'Appointment not found',
			})
			return
		}

		response.status(StatusCodes.OK).send({
			data: appointment,
		})
	} catch (err) {
		console.error(err)
		response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: 'Internal service error. Please check logs',
		})
	}
}
