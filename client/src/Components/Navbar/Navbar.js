import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaTimes } from 'react-icons/fa';

import { useAuth } from '../Auth/useAuth';
import Backdrop from '../Shared/Backdrop/Backdrop';
import './Navbar.css';

function Navbar() {
	//Consumer of auth context to keep state
	const auth = useAuth();
	const [click, setClick] = useState(false);
	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	return (
		<nav className='navbar'>
			{click && <Backdrop onClick={handleClick} />}
			<NavLink className='navbar_logo' to='/' exact onClick={closeMobileMenu}>
				Available Courses
			</NavLink>
			<div className='menu_icon' onClick={handleClick}>
				{click ? <FaTimes /> : <GiHamburgerMenu />}
			</div>
			{auth.user ? (
				<ul className={click ? 'nav_menu active' : 'nav_menu'}>
					<li className='userName'>
						Welcome {`${auth.user.firstName} ${auth.user.lastName}`}
					</li>
					<li className='signOut-Link'>
						<NavLink to='/signout' onClick={closeMobileMenu}>
							Sign Out
						</NavLink>
					</li>
				</ul>
			) : (
				<ul className={click ? 'nav_menu active' : 'nav_menu'}>
					<li className='nav_item'>
						<NavLink
							className='nav_links'
							onClick={closeMobileMenu}
							to='/signup'>
							SIGN UP
						</NavLink>
					</li>
					<li className='nav_item'>
						<NavLink
							className='nav_links'
							onClick={closeMobileMenu}
							to='/signin'>
							SIGN IN
						</NavLink>
					</li>
				</ul>
			)}
		</nav>
	);
}

export default Navbar;
