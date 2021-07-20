import React, { ReactNode } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText, Stack, Button } from '@material-ui/core'
import ImageIcon from '@material-ui/icons/Image'
import { AppointmentApi } from '../apis/appointment.api'
import { Appointment } from '../common/types'

type State = {
	appointments: Array<Appointment>
}

type PathParamsType = {}

type Props = RouteComponentProps<PathParamsType> & {
	appointmentApi: AppointmentApi
}

class ViewAppointments extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			appointments: [],
		}
	}

	render(): ReactNode {
		const { appointments } = this.state
		const renderAppointment = (appointment: Appointment): ReactNode => {
			return (
				<ListItemButton key={appointment.id} onClick={() => this.onSelectAppointment(appointment.id)}>
					<ListItemAvatar>
						<Avatar>
							<ImageIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={this.truncateString(appointment.description, 50)}
						secondary={`${appointment.time}, ${appointment.date}`}
					/>
				</ListItemButton>
			)
		}

		return (
			<Stack>
				<h2>My Appointments</h2>
				<Button variant="contained" color="primary" onClick={() => this.onCreateAppointment()}>
					CREATE NEW APPOINTMENT
				</Button>
				<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
					{appointments.map((appointment) => renderAppointment(appointment))}
				</List>
			</Stack>
		)
	}

	componentDidMount() {
		this.loadAppointments()
	}

	private async loadAppointments() {
		try {
			const appointments = await this.props.appointmentApi.getAppointments({ offset: 0 })

			this.setState({ appointments })
		} catch (err) {
			window.alert('Error retrieving Appointments.')
		}
	}

	private onSelectAppointment(appointmentId: string) {
		this.props.history.push('/view-appointment/' + appointmentId)
	}

	private truncateString(input: string, maxLength = 20): string {
		return input.length > maxLength ? input.substr(0, maxLength) + '...' : input
	}

	private onCreateAppointment() {
		this.props.history.push('create-appointment')
	}
}

export default withRouter(ViewAppointments)
