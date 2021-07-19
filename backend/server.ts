import express from 'express'
import { handler as createAppointmentHandler } from './handlers/handler.create-appointment'
import { handler as getAppointmentsHandler } from './handlers/handler.get-appointments'
import { handler as getAppointmentHandler } from './handlers/handler.get-appointment-by-id'
import { handler as deleteAppointmentHandler } from './handlers/handler.delete-appointment-by-id'
import { handler as updateAppointmentHandler } from './handlers/handler.update-appointment-by-id'

require('dotenv').config()

const app = express()
const port = process.env.SERVER_PORT ?? 8181

app.listen(port, () => {
	console.log(`Application started. Listing on port ${port}`)
})

// Express 4.16+ has own JSON and URL Encoded middleware
// No longer need to use bodyparser
app.use(express.json())
app.use(express.urlencoded())

app.post('/appointments', (req, res) => createAppointmentHandler(req, res))
app.get('/appointments', (req, res) => getAppointmentsHandler(req, res))
app.get('/appointments/:id', (req, res) => getAppointmentHandler(req, res))
app.delete('/appointments/:id', (req, res) => deleteAppointmentHandler(req, res))
app.put('/appointments/:id', (req, res) => updateAppointmentHandler(req, res))
