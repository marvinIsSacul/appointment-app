import { bootstrap } from '../bootstrap.appointment-service'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { assemble } from '../../common/util'
import { UpdateAppointmentErrorResponse, UpdateAppointmentResponse } from '../../common/types'
import { InputException } from '../../common/exceptions'

export async function handler(
	request: Request,
	response: Response<UpdateAppointmentResponse | UpdateAppointmentErrorResponse>,
): Promise<void> {
	const service = bootstrap()

	try {
		const { id } = request.params

		if (!id) {
			throw new InputException('Appointment id not specified')
		}

		const expectedBody = assemble<{ date: string; description: string; time: string }>(request.body, [
			{
				key: 'date',
				required: false,
				validator: (val) => typeof val === 'string' && val.length > 0,
			},
			{
				key: 'time',
				required: false,
				validator: (val) => typeof val === 'string' && val.length > 0,
			},
			{
				key: 'description',
				required: false,
				validator: (val) => typeof val === 'string' && val.length > 0,
			},
		])

		if (Object.values(expectedBody).length === 0) {
			throw new InputException('No valid fields specified')
		}

		const appointment = await service.updateAppointmentById({
			id,
			date: expectedBody.date,
			description: expectedBody.description,
			time: expectedBody.time,
		})

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
