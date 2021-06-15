import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Components/Header';
import Courses from './Components/Courses';
import CreateCourse from './Components/CreateCourse';
import CourseDetail from './Components/CourseDetail';

import withContext from './Context';

const HeaderWithContext = withContext(Header);

function App() {
	return (
		<Router>
			<div>
				<HeaderWithContext />
				<Switch>
					<Route exact path='/' component={Courses} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
