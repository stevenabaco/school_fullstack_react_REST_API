import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Components/Header';
import Courses from './Components/Courses';
import CreateCourse from './Components/CreateCourse';
import CourseDetail from './Components/CourseDetail';

import withContext from './Context';

function App() {
	return (
		<Router>
			<div>
				<Header />
				<Switch>
					<Route exact path='/' component={Courses} />
					<PrivateRoute path='/courses/create'>
						<CreateCourse></CreateCourse>
					</PrivateRoute>
					<Route path='/courses/:id' component={CourseDetail} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
