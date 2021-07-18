import React, { ReactNode } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from '@material-ui/core'
import ImageIcon from '@material-ui/icons/Image'
import { AppointmentApi } from '../apis/appointment.api'
import { Appointment } from '../types'

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
						primary={this.truncateString(appointment.description, 20)}
						secondary={`${appointment.time}, ${appointment.date}`}
					/>
				</ListItemButton>
			)
		}

		return (
			<List sx={{ width: '90%', bgcolor: 'background.paper' }}>
				{appointments.map((appointment) => renderAppointment(appointment))}
			</List>
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
}

export default withRouter(ViewAppointments)
