import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';

import Header from './Components/Header';
import Courses from './Components/Courses';

function App() {
	return (
		<Router>
				<Header />
			<Switch>
				<Route exact path='/' component={Courses} />
			</Switch>
		</Router>
	);
}

export default App;
