import React, { useEffect } from 'react';
import './Layout.css';
import Navbar from '../Navbar/Navbar';
// Import images
import homebgpic from '../../assets/images/background-main.jpg';

const Layout = props => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
      <Navbar />
      <main className='wrap'>{props.children}</main>
    </>
	);
};

export default Layout;