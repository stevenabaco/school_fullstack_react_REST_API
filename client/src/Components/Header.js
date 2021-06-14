/* Displays top menu bar for the app and includes
buttons for signing in and signing up (if there's
not an authenticated user) or the user's name and a
button for signing out (if there's and authenticated
user).
*/

import React from 'react';

function Header() {
	return (
		<header>
			<div className='wrap header--flex'>
				<h1 className='header--logo'>
					<a href='index.html'>Courses</a>
				</h1>
				<nav>
					<ul className='header--signedout'>
						<li>
							<a href='sign-up.html'>Sign Up</a>
						</li>
						<li>
							<a href='sign-in.html'>Sign In</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Header;
