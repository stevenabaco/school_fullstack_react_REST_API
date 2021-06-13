import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory, Link } from 'react-router-dom';

import Header from './Components/Header';
import Courses from './Components/Courses';

function App() {
  useEffect(() => {
		fetch('http://localhost:5000/api/courses')
	}, []);
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
