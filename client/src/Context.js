import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './DataHandler';

const Context = React.createContext();

//Create context provider
export class Provider extends Component {
	state = {
		authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
	};

	constructor() {
		super();
		this.data = new Data();
	}

	render() {
		const { authenticatedUser } = this.state;
		const value = {
			authenticatedUser,
			data: this.data,
			actions: {
				signIn: this.signIn,
				signOut: this.signOut,
			},
		};
		return (
			<Context.Provider value={value}>{this.props.children}</Context.Provider>
		);
	}

	// Function to sign in user
	signIn = async (username, password) => {
		const user = await this.data.getUser(username, password);
		if (user !== null) {
			this.setState(() => {
				return {
					authenticatedUser: user,
				};
      });
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user
	};

	// Function to sign out user
	signOut = () => {
		this.setState(() => {
			return {
				authenticatedUser: null,
			};
		});
		Cookies.remove(`authenticatedUser`);
	};
}

export const Consumer = Context.Consumer;

// Higher order component to wrap the provided component with access to
export default function withContext(Component) {
	return function ContextComponent(props) {
		return (
			<Context.Consumer>
				{context => <Component {...props} context={context} />}
			</Context.Consumer>
		);
	};
}
