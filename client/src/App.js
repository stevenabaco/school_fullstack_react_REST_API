import React from 'react';
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import PrivateRoute from './PrivateRoute';
import NotFound from './Components/NotFound';
import Error from './Components/Error';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';


function App() {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path='/' component={Courses}/>
				<Route exact path='/courses' component={Courses} />
			</Switch>
		</Router>
	);
}

export default App;
