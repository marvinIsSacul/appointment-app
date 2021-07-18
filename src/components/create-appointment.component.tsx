import React, { ReactNode } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, TextField } from '@material-ui/core'
import Stack from '@material-ui/core/Stack'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { AppointmentApi } from '../apis/appointment.api'
import { Appointment } from '../types'

type State = {
	details: string
	time: string
	date: string
	hasTriedSubmittingForm: boolean // only start showing any errors if user has tried submitting the form.
	isSubmitting: boolean
	isShowDialog: boolean

	createdAppointment?: Appointment
}

type PathParamsType = {}

type Props = RouteComponentProps<PathParamsType> & {
	appointmentApi: AppointmentApi
}

class CreateAppointment extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			details: '',
			time: '',
			date: '',
			hasTriedSubmittingForm: false,
			isSubmitting: false,
			isShowDialog: false,
		}
	}

	render(): ReactNode {
		const { details, time, date, hasTriedSubmittingForm, isSubmitting } = this.state

		return (
			<div>
				<form noValidate>
					<Stack spacing={3}>
						<h2>&nbsp;New Appointment</h2>
						<TextField
							required
							error={hasTriedSubmittingForm && details.length === 0}
							helperText={hasTriedSubmittingForm && details.length === 0 ? 'Appointment description.' : ''}
							label="Details"
							variant="outlined"
							multiline
							minRows={3}
							maxRows={6}
							onChange={(event) => this.onDescriptionChange(event)}
							disabled={isSubmitting}
						/>
						<TextField
							type="time"
							error={hasTriedSubmittingForm && time.length === 0}
							helperText={hasTriedSubmittingForm && time.length === 0 ? 'Appointment time.' : ''}
							required
							label="Time"
							InputLabelProps={{
								shrink: true,
							}}
							inputProps={{
								step: 300, // 5 minutes
							}}
							onChange={(event) => this.onTimeChange(event)}
							disabled={isSubmitting}
						/>
						<TextField
							type="date"
							error={hasTriedSubmittingForm && date.length === 0}
							helperText={hasTriedSubmittingForm && date.length === 0 ? 'Appointment date.' : ''}
							required
							label="Date"
							InputLabelProps={{
								shrink: true,
							}}
							onChange={(event) => this.onDateChange(event)}
							disabled={isSubmitting}
						/>
						<Button variant="contained" color="primary" onClick={() => this.onCreateAppointment()} disabled={isSubmitting}>
							{isSubmitting ? '...' : 'CREATE'}
						</Button>
					</Stack>
				</form>
				{this.renderDialog()}
			</div>
		)
	}

	private closeDialog() {
		this.setState({ isShowDialog: false })
	}

	private openDialog() {
		this.setState({ isShowDialog: true })
	}

	private renderDialog() {
		const { isShowDialog, createdAppointment } = this.state

		return (
			<Dialog
				open={isShowDialog}
				onClose={() => this.closeDialog}
				aria-labelledby="window.-dialog-title"
				aria-describedby="window.-dialog-description"
			>
				<DialogTitle>Appointment Successfully Created</DialogTitle>
				<DialogActions>
					<Button
						onClick={createdAppointment ? () => this.props.history.push('/view-appointment/' + createdAppointment.id) : undefined}
					>
						View Appointment
					</Button>
					<Button onClick={() => this.clearForm()} autoFocus>
						Create New Appointment
					</Button>
				</DialogActions>
			</Dialog>
		)
	}

	private clearForm() {
		this.setState({
			date: '',
			hasTriedSubmittingForm: false,
			details: '',
			isShowDialog: false,
			isSubmitting: false,
			time: '',
		})
	}

	private async onCreateAppointment() {
		const { details, time, date } = this.state

		this.setState({
			...this.state,
			hasTriedSubmittingForm: true,
		})

		if (details.length === 0) {
			alert('Enter Description please.')
			return
		}
		if (time.length === 0) {
			alert('Enter Time please.')
			return
		}
		if (date.length === 0) {
			alert('Enter Date please.')
			return
		}

		this.setState({
			...this.state,
			isSubmitting: true,
		})

		try {
			const newAppointment = await this.props.appointmentApi.createAppointment({
				date,
				description: details,
				time,
			})
			this.setState({ createdAppointment: newAppointment })
			this.openDialog()
		} catch (err) {
			console.error(err)
			this.setState({
				...this.state,
				isSubmitting: false,
			})
			window.alert('Error creating a new Appointment')
		}
	}

	private async onDescriptionChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		this.setState({
			...this.state,
			details: event.target.value,
		})
	}

	private async onDateChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		this.setState({
			...this.state,
			date: event.target.value,
		})
	}

	private async onTimeChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		this.setState({
			...this.state,
			time: event.target.value,
		})
	}
}

export default withRouter(CreateAppointment)
