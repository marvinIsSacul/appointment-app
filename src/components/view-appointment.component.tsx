import React, { ReactNode } from 'react'
import { Button, TextField } from '@material-ui/core'
import Stack from '@material-ui/core/Stack'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { AppointmentApi } from '../apis/appointment.api'
import { Appointment } from '../common/types'

type State = {
	isDeleting: boolean
	appointment?: Appointment
	isLoadingAppointment: boolean
	isFailedLoadingAppointment: boolean
}

type PathParamsType = {
	appointmentId: string
}

type Props = RouteComponentProps<PathParamsType> & {
	appointmentApi: AppointmentApi
}

class ViewAppointment extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			isDeleting: false,
			isLoadingAppointment: false,
			isFailedLoadingAppointment: false,
		}
	}

	componentDidMount() {
		this.loadAppointment()
	}

	render(): ReactNode {
		const { appointment } = this.state

		if (!appointment) {
			return <div>Count not load</div>
		}

		return (
			<div>
				<Stack spacing={3}>
					<h2>&nbsp;View Appointment</h2>
					<TextField
						contentEditable={false}
						value={appointment.description}
						aria-readonly
						label="Details"
						variant="outlined"
						multiline
						minRows={3}
						maxRows={6}
					/>
					<TextField
						value={appointment.time}
						aria-readonly
						type="time"
						required
						label="Time"
						InputLabelProps={{
							shrink: true,
						}}
						inputProps={{
							step: 300, // 5 minutes
						}}
					/>
					<TextField
						type="date"
						value={appointment.date}
						aria-readonly
						contentEditable={false}
						required
						label="Date"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<Stack spacing={2} direction="row">
						<Button variant="contained" color="primary" onClick={() => this.props.history.replace('/view-appointments')}>
							VIEW MY APPOINTMENTS
						</Button>
						<Button variant="contained" color="warning" onClick={() => this.onEditAppointment()}>
							EDIT
						</Button>
						<Button variant="contained" color="error" onClick={() => this.onDeleteAppointment()}>
							DELETE
						</Button>
					</Stack>
				</Stack>
			</div>
		)
	}

	private async onDeleteAppointment() {
		const { appointment } = this.state

		if (!appointment) {
			window.alert('No Appointment to delete.')
			return
		}

		if (!window.confirm('Delete Appointment?')) {
			return
		}

		this.setState({
			isDeleting: true,
		})

		try {
			await this.props.appointmentApi.deleteAppointment({ appointmentId: appointment.id })
			window.alert('Appointment successfully deleted.')
			this.props.history.replace('/view-appointments')
		} catch (err) {
			console.error(err)
			this.setState({
				...this.state,
				isDeleting: false,
			})
			window.alert('Error deleting Appointment')
		}
	}

	private async onEditAppointment() {
		const { appointment } = this.state

		if (!appointment) {
			window.alert('No Appointment to delete.')
			return
		}

		this.props.history.push('/edit-appointment/' + appointment.id)
	}

	private async loadAppointment() {
		const { appointmentApi, match } = this.props
		try {
			this.setState({
				isLoadingAppointment: true,
			})

			const appointment = await appointmentApi.getAppointmentById({ appointmentId: match.params.appointmentId })

			this.setState({ appointment, isLoadingAppointment: false })
		} catch (err) {
			console.error(err)
			this.setState({ isFailedLoadingAppointment: true })
			window.alert('Error loading Appointment')
		}
	}
}

export default withRouter(ViewAppointment)
