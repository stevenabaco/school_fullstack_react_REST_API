import React, { useState, useContext, createContext } from 'react';
import Cookies from 'js-cookie';
const authContext = createContext();

// Context Provider for Auth to all components
export function AuthProvider({ children }) {
	const auth = useProvideAuth();
	return (
		<authContext.Provider value {...auth}>
			{children}
		</authContext.Provider>
	);
}

//Hook
export const useAuth = () => {
	return useContext(authContext);
};

// Hook Provider Handler => Creates Auth Object and Handles State

function useProvideAuth() {
	const [user, setUser] = useState(Cookies.getJSON('authenticatedUser'));
	const [credentials, setCredentials] = useState(
		Cookies.getJSON('credentials')
	);

	const signin = (email, password, cb) => {
		const encodedCredentials = btoa(`${email}:${password}`);
		const options = {
			method: 'GET',
			headers: {
				Authorization: `Basic ${encodedCredentials}`,
			},
		};

		return fetch(`http://localhost:5000/api/users`, options).then(res => {
			if (res.status === 200) {
				res.json().then(data => {
					setUser(data);
					setCredentials(encodedCredentials);
					cb();
					Cookies.set('authenticatedUser', JSON.stringify(data), {
						expires: 1,
					});
					Cookies.set('credentials', JSON.stringify(encodedCredentials), {
						expires: 1,
					});
					return null;
				});
			} else if (res.status === 401) {
				return res.json().then(error => error.message);
			} else {
				throw new Error();
			}
		});
	};

	const signup = (firstName, lastName, email, password) => {};

	const signout = () => {};

	return {
		user,
		credentials,
		signin,
		signout,
		signup,
	};
}
