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
import Error404 from './Components/Error404';
import Error500 from './Components/Error500';
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
				<Route exact path='/'><Redirect to="/courses" /></Route>
				<Route exact path='/courses' component={Courses} />
				<Route path='/courses/:id' component={CourseDetail} />
				<Route path='/error404' component={Error404}/>
			</Switch>
		</Router>
	);
}

export default App;
