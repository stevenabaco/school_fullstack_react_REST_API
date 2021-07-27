// Load modules
const path = require('path');
const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');

// Import dependencies
const routes = require('./routes');

// create the Express app
const app = express();

// instantiate express to parse request body
app.use(express.json());

app.use(express.static(path.join('/public')));

// Enable CORS for all origins **IMPORTANT**
app.use(cors());

// Add routes to api endpoint
app.use('/api', routes);
app.use((req, res, next) => {
	res.sendFile(path.resolve(__dirname, '/public', '/index.html'));
});

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
	res.json({
		message: 'Welcome to the REST API project!',
	});
});

// // Code for single server hosting... only when Frontend is put in back-end public folder
// app.use((req, res, next) => {
// 	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });

// send 404 if no other route matched
app.use((req, res) => {
	res.status(404).json({
		message: 'Route Not Found',
	});
});

// setup a global error handler
app.use((err, req, res, next) => {
	if (enableGlobalErrorLogging) {
		console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
	}

	res.status(err.status || 500).json({
		message: err.message,
		error: err.status,
	});
});

// Test database connection
(async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established with database successfully!');
		await sequelize.sync();
		console.log('DB SYNCED');
	} catch (err) {
		console.log('Unable to connect to the database: ', err);
	}
})();

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
	console.log(`Express server is listening on port ${server.address().port}`);
});
