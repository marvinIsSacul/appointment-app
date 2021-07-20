import { Container } from '@material-ui/core'
import React, { ReactNode } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import CreateAppointment from './components/create-appointment.component'
import ViewAppointments from './components/view-appointments.component'
import ViewAppointment from './components/view-appointment.component'
import EditAppointment from './components/edit-appointment.component'
import { AppointmentApiUsingHttp } from './apis'

type State = {}

type Props = {}

export default class App extends React.Component<Props, State> {
	private appointmentsApi = new AppointmentApiUsingHttp()

	render(): ReactNode {
		return (
			<Container maxWidth="md">
				<Router>
					<Switch>
						<Route exact path="/view-appointments">
							<ViewAppointments appointmentApi={this.appointmentsApi} />
						</Route>
						<Route exact path="/">
							<ViewAppointments appointmentApi={this.appointmentsApi} />
						</Route>
						<Route exact path="/create-appointment">
							<CreateAppointment appointmentApi={this.appointmentsApi} />
						</Route>
						<Route exact path="/view-appointment/:appointmentId">
							<ViewAppointment appointmentApi={this.appointmentsApi} />
						</Route>
						<Route exact path="/edit-appointment/:appointmentId">
							<EditAppointment appointmentApi={this.appointmentsApi} />
						</Route>
					</Switch>
				</Router>
			</Container>
		)
	}
}
