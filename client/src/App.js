import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';

import Header from './Components/Header';
import withContext from "./Context";
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import UserSignUp from './Components/UserSignUp';
import UserSignIn from './Components/UserSignIn';
import UserSignOut from './Components/UserSignOut';
import Error from './Components/Error';
import NotFound from './Components/NotFound';

import PrivateRoute from './PrivateRoute';

function App() {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path='/'>
					<Redirect to='/courses' />
				</Route>
				<Route exact path='/courses' component={Courses} />
			</Switch>
		</Router>
	);
}

export default App;
