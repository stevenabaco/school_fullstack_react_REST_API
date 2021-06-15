import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
	state = {
		username: '',
		password: '',
		errors: [],
	};

	render() {
		const { username, password, errors } = this.state;

		return (
			<div className='form--centered'>
				<h2>Sign in</h2>
				<Form
					cancel={this.cancel}
					errors={errors}
					submit={this.submit}
					submitButtonText='Sign In'
					elements={() => (
						<React.Fragment>
							<label htmlFor='username'>Email Address</label>
							<input
								id='username'
								name='username'
								type='email'
								value={username}
								onChange={this.change}
							/>
							<label htmlFor='password'>Password</label>
							<input
								id='password'
								name='password'
								type='password'
								value={password}
								onChange={this.change}
							/>
						</React.Fragment>
					)}
				/>
				<p>
					Don't have a user account? Click here to
					<Link to='/signup'> sign up</Link>!
				</p>
			</div>
		);
	}

	change = event => {
		const name = event.target.name;
		const value = event.target.value;

		this.setState(() => {
			return {
				[name]: value,
			};
		});
	};

	submit = () => {
		// Handle submit method
		const { context } = this.props;
		const { from } = this.props.location.state || { from: '/authenticated' };
		const { username, password } = this.state;
		
		context.actions
			.signIn(username, password)
			.then(user => {
				if (user === null) {
					this.setState(() => {
						return { errors: ['Oh No... Sign-in was not successful'] };
					});
				} else {
					this.props.history.push(from);
					console.log(`SUCCESS! ${username} is now signed in!`);
				}
			})
			.catch(err => {
				console.log(err);
				this.props.history.push('/error');
			});
	};
	cancel = () => {
		// Cancel and go back to root route
		this.props.history.push('/');
	};
}
