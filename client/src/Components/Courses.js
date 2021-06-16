// Import Modules
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

// Import Dependencies
import Data from '../Data';
import Context from '../Context';
import CourseDetail from './CourseDetail';

function Courses() {
	// Set Context
	const context = useContext(Context.Context);
	// Set state for list of Courses
	const [coursesList, setCoursesList] = useState([]);

	const dataHandler = new Data();

	// Pull courses from API and set state with Courses
	useEffect(() => {
		let mounted = true;
		dataHandler
			.getCourses()
			.then(courses => {
				if (mounted) {
					setCoursesList(courses);
				}
			})
			.catch(err => console.log('Error fetching and parsing data', err));
		return () => (mounted = false);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	let courses = coursesList.map(course => <CourseDetail title={course.title} description={course.description} id={course.id} key={course.id} />);
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
}

export default Courses;
