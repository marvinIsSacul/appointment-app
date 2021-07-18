import React, { ReactNode } from 'react'
import { Button, TextField } from '@material-ui/core'
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
	isLoadingAppointment: boolean
	isFailedLoadingAppointment: boolean
	loadedAppointment?: Appointment
}

type PathParamsType = {
	appointmentId: string
}

type Props = RouteComponentProps<PathParamsType> & {
	appointmentApi: AppointmentApi
}

class EditAppointment extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			details: '',
			time: '',
			date: '',
			hasTriedSubmittingForm: false,
			isSubmitting: false,
			isLoadingAppointment: false,
			isFailedLoadingAppointment: false,
		}
	}

	private readonly descriptionRef = React.createRef<HTMLInputElement>()
	private readonly timeRef = React.createRef<HTMLInputElement>()
	private readonly dateRef = React.createRef<HTMLInputElement>()

	render(): ReactNode {
		const { details, time, date, hasTriedSubmittingForm, isSubmitting, loadedAppointment } = this.state

		if (!loadedAppointment) {
			return <div>No appointment loaded!</div>
		}

		return (
			<form noValidate>
				<Stack spacing={3}>
					<h2>&nbsp;Edit Appointment</h2>
					<TextField
						ref={this.descriptionRef}
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
						ref={this.timeRef}
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
						ref={this.dateRef}
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
					<Stack direction="row" spacing={2}>
						<Button variant="contained" color="primary" onClick={() => this.onUpdateAppointment()} disabled={isSubmitting}>
							UPDATE
						</Button>
						<Button variant="contained" color="error" onClick={() => this.props.history.goBack()} disabled={isSubmitting}>
							CANCEL
						</Button>
					</Stack>
				</Stack>
			</form>
		)
	}

	componentDidMount() {
		this.loadAppointment()
	}

	private async onUpdateAppointment() {
		const { details, time, date, loadedAppointment } = this.state

		this.setState({
			...this.state,
			hasTriedSubmittingForm: true,
		})

		if (!loadedAppointment) {
			window.alert('No Appointment to update.')
			return
		}

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
			const updateAppointment = await this.props.appointmentApi.updateAppointment({
				id: loadedAppointment.id,
				date,
				description: details,
				time,
			})
			this.setState({
				loadedAppointment: {
					...loadedAppointment,
					...updateAppointment,
				},
			})
		} catch (err) {
			console.error(err)
			this.setState({
				...this.state,
				isSubmitting: false,
			})
			alert('Error creating a new Appointment')
		}
	}

	private async loadAppointment() {
		const { appointmentApi, match } = this.props
		try {
			this.setState({
				isLoadingAppointment: true,
			})

			const appointment = await appointmentApi.getAppointmentById({ appointmentId: match.params.appointmentId })

			if (this.dateRef.current && this.descriptionRef.current && this.timeRef.current) {
				this.dateRef.current.value = appointment.date
				this.descriptionRef.current.value = appointment.description
				this.timeRef.current.value = appointment.time
			}

			this.setState({ loadedAppointment: appointment, isLoadingAppointment: false })
		} catch (err) {
			console.error(err)
			this.setState({ isFailedLoadingAppointment: true, isLoadingAppointment: false })
			window.alert('Error loading Appointment')
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

export default withRouter(EditAppointment)
