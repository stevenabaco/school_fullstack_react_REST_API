import config from './config';

export default class Data {
	// Function to get access to api
	api(
		path,
		method = 'GET',
		body = null,
		requiresAuth = false,
		credentials = null
	) {
		const url = config.apiBaseUrl + path;

		const options = {
			method,
			headers: {
				'Content-Type': 'application/json; charset=utf8',
			},
		};

		// Check if body is null. If not null Stringify content
		if (body !== null) {
			options.body = JSON.stringify(body);
		}

		// Check if authentication is required. If required get use credentials and options
		if (requiresAuth) {
			const encodedCredentials = btoa(
				`${credentials.username}:${credentials.password}`
			);
			options.headers['Authorization'] = `Basic ${encodedCredentials}`;
		}
		return fetch(url, options);
	}

	async getUser(username, password) {
		const res = await this.api(`/users`, `GET`, null, true, {
			username,
			password,
		});
		// Check status
		if (res.status === 200) {
			// Convert data into JSON and return
			return res.json().then(data => data);
		} else if (res.status === 401) {
			return null;
		} else {
			throw new Error();
		}
	}

	async createUser(user) {
		const res = await this.api('/users', 'POST', user);
		// Check status
		if (res.status === 201) {
			return ['User successfully created'];
		} else if (res.status === 400) {
			// Convert respons into JSON and return
			return res.jason().then(data => {
				return data.errors;
			});
		} else {
			throw new Error();
		}
	}
}
