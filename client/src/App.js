import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Components/Header';
import Courses from './Components/Courses';
import UserSignIn from './Components/UserSignIn';
import CreateCourse from './Components/CreateCourse';
import CourseDetail from './Components/CourseDetail';

import withContext from './Context';

const HeaderWithContext = withContext(Header);
const UserSignInWithContext = withContext(UserSignIn);

export default function App() {
	return (
		<Router>
				<HeaderWithContext />
				<Switch>
					<Route exact path='/' component={Courses} />
					<Route path='/signin' component={UserSignInWithContext}/>
				</Switch>
		</Router>
	);
}


