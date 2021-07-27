import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';

import { ProvideAuth } from './Components/Auth/useAuth';
import Header from './Components/Header/Header';
import Courses from './Components/Courses/Courses';
import CourseDetail from './Components/CourseDetail/CourseDetail';
import UserSignIn from './Components/Auth/UserSignIn';
import UserSignUp from './Components/Auth/UserSignUp';
import UserSignOut from './Components/Auth/UserSignOut';
import CreateCourse from './Components/CreateCourse/CreateCourse';
import UpdateCourse from './Components/UpdateCourse/UpdateCourse';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Error401 from './Components/Errors/Error401';
import UnhandledError from './Components/Errors/UnhandledError';
import NotFound from './Components/Errors/NotFound';
import Forbidden from './Components/Errors/Forbidden';

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
					<PrivateRoute path='/courses/:id/update'>
						<UpdateCourse />
					</PrivateRoute>
					<Route path='/courses/:id' component={CourseDetail} />
					<Route path='/notfound' component={NotFound} />
					<Route path='/error' component={UnhandledError} />
					<Route path='/forbidden' component={Forbidden} />
					<Route path='/error401' component={Error401} />
					<Route path='/signin' component={UserSignIn} />
					<Route path='/signup' component={UserSignUp} />
					<Route path='/signout' component={UserSignOut} />
					<Route>
						<NotFound/>
					</Route>
				</Switch>
			</Router>
		</ProvideAuth>
	);
}

export default App;
