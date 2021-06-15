/* eslint-disable import/no-anonymous-default-export */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import DataHandler from './DataHandler';

const Context = React.createContext();

export class Provider extends Component {
	state = {
		// Authenticate user and password with Cookies
		// If no Cookies to set State return null
		authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
		authenticatedPassword: Cookies.getJSON('authenticatedPassword') || null,
	};

	constructor() {
		super();
		this.dataHandler = new DataHandler();
	}

	render() {
		const { authenticatedUser, authenticatedPassword } = this.state;
		const value = {
			authenticatedUser,
			authenticatedPassword,
			dataHandler: this.dataHandler,
			actions: {
				signIn: this.signIn,
				signOut: this.signOut,
				validation: this.validation,
			},
		};

		return (
			<Context.Provider value={value}>{this.props.children}</Context.Provider>
		);
	}

	// ACTION => Sign In 'user' and assign Cookie
	// PARAMS => 'username' , 'password'
	signIn = async (username, password) => {
		const user = await this.data.getUser(username, password);
		const hashedPass = btoa(password);
		if (user !== null) {
			this.setState(() => {
				return {
					authenticatedUser: user,
					authenticatedPassword: hashedPass,
				};
			});
			Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
			Cookies.set('authenticatedPassword', JSON.stringify(hashedPass), {
				expires: 1,
			});
		}
		return user;
	};

	// ACTION => Sign Out 'user' and remove Cookie
	// PARAMS => None
	signOut = () => {
		this.setState({ authenticatedUser: null, authenticatedPassword: null });
		Cookies.remove('authenticatedPassword');
		Cookies.remove(`authenticatedUser`);
	};

	// ACTION => Return any errors
	// PARAMS => None
	validation = errors => {
		if (errors) {
			return (
				<div className='validation--errors'>
					<h3>Validation Errors</h3>
					<ul>{errors}</ul>
				</div>
			);
		}
	};
}

export const Consumer = Context.Consumer;

// Higher order component to wrap the provided component with access to
export default {Context};
