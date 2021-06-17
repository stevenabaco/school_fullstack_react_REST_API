import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';

import { ProvideAuth } from './Components/useAuth';
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import PrivateRoute from './PrivateRoute';
import Error403 from './Components/Error403';
import Error404 from './Components/Error404';
import Error500 from './Components/Error500';

function App() {
	return (
		<ProvideAuth>
			<Router>
				<Header />
				<Switch>
					<Route exact path='/'>
						<Redirect to='/courses' />
					</Route>
					<Route exact path='/courses' component={Courses} />
					<PrivateRoute path='/courses/create'>
						<CreateCourse />
					</PrivateRoute>
					<Route path='/courses/:id' component={CourseDetail} />
					<Route path='/error404' component={Error404} />
					<Route path='/error403' component={Error403} />
					<Route path='/error500' component={Error500} />
					<Route path='/signin' component={UserSignIn} />
					<Route path='/signup' component={UserSignUp} />
					<Route path='/signout' component={UserSignOut} />
				</Switch>
			</Router>
		</ProvideAuth>
	);
}

export default App;
