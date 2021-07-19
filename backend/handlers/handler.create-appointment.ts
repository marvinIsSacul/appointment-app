import { bootstrap } from '../bootstrap.appointment-service'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { assemble } from '../../common/util'
import { CreateAppointmentErrorResponse, CreateAppointmentResponse } from '../../common/types'

export async function handler(
	request: Request,
	response: Response<CreateAppointmentResponse | CreateAppointmentErrorResponse>,
): Promise<void> {
	const service = bootstrap()

	try {
		const expectedBody = assemble<{ date: string; description: string; time: string }>(request.body, [
			{
				key: 'date',
				required: true,
				validator: (val) => typeof val === 'string' && val.length > 0,
			},
			{
				key: 'time',
				required: true,
				validator: (val) => typeof val === 'string' && val.length > 0,
			},
			{
				key: 'description',
				required: true,
				validator: (val) => typeof val === 'string' && val.length > 0,
			},
		])
		const appointment = await service.createAppointment({
			date: expectedBody.date,
			description: expectedBody.description,
			time: expectedBody.time,
		})

		response.status(StatusCodes.CREATED).send({
			data: appointment,
		})
	} catch (err) {
		console.error(err)
		response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: 'Internal service error. Please check logs',
		})
	}
}
