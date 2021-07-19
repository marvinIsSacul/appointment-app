import { bootstrap } from '../bootstrap.appointment-service'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { GetAppointmentsErrorResponse, GetAppointmentsResponse } from '../../common/types'

export async function handler(
	request: Request,
	response: Response<GetAppointmentsErrorResponse | GetAppointmentsResponse>,
): Promise<void> {
	const service = bootstrap()

	try {
		let limit: number, offset: number

		limit = request.params.limit === undefined ? 20 : Number(request.params.limit)
		offset = request.params.offset === undefined ? 0 : Number(request.params.offset)

		const appointments = await service.getAppointments({
			limit,
			offset,
		})

		response.status(StatusCodes.OK).send({
			offset,
			limit,
			data: appointments,
		})
	} catch (err) {
		console.error(err)
		response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: 'Internal service error. Please check logs',
		})
	}
}
