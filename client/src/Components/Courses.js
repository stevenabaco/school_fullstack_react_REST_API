// Import Modules
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

// Import Dependencies
import DataHandler from '../DataHandler';
import Context from '../Context';
import CourseDetail from './CourseDetail';

function Courses() {
	// Set Context
	const context = useContext(Context.Context)
	// Set state for Courses
	const [courses, setCourses] = useState([]);
	
	const dataHandler = new DataHandler();

	// Pull courses from API and set state with Courses
	useEffect(() => {
		try {
			dataHandler.getCourses()
				.then(courses => {
					setCourses(courses)
				});
		} catch (err) {
			console.log('Error fetching and Parsing', err)
		} 
	}, [dataHandler]);
	console.log(courses);
	return (
		<main>
			<div className='wrap main--grid'>
				{courses.map(course => {
					return (
						<Link
							key={course.id}
							className='course--module course--link'
							to={`courses/${course.id}`}>
							<h2 className='course--label'>Course</h2>
							<h3 className='course--title'>{course.title}</h3>
						</Link>
					);
				})}

				<Link
					className='course--module course--add--module'
					to='/courses/create'>
					<span className='course--add--title'>
						<svg
							version='1.1'
							xmlns='http://www.w3.org/2000/svg'
							x='0px'
							y='0px'
							viewBox='0 0 13 13'
							className='add'>
							<polygon points='7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 '></polygon>
						</svg>
						New Course
					</span>
				</Link>
			</div>
		</main>
	);
};

export default Courses;
