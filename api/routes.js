// Load Modules
const express = require('express');

// Import dependencies
const { asyncHandler } = require('./middleware/async-handler');
const { User, Course } = require('./models');
const { authenticateUser } = require('./middleware/auth-user');
const { ValidationErrorItem } = require('sequelize');
const e = require('express');

// Construct a router instance
const router = express.Router();

// GET - AUTHORIZE User - RETURN status 200
router.get(
	'/users',
	authenticateUser,
	asyncHandler(async (req, res, next) => {
		// return res.status(500).json({}); // Used for developement testing only
		const user = req.currentUser;
		res.json({
			// Display just name and email of user. Filter out other columns.
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			emailAddress: user.emailAddress,
		});
	})
);

// GET - All Courses with User that belongs to each course w/ 200 status
router.get(
	'/courses',
	asyncHandler(async (req, res) => {
		// return res.status(500).json({}); // Used just for testing errors
		const courses = await Course.findAll({
			attributes: [
				'id',
				'title',
				'description',
				'estimatedTime',
				'materialsNeeded',
				'userId',
			],
			include: [
				{
					model: User,
					attributes: ['id', 'firstName', 'lastName', 'emailAddress'],
				},
			],
		});
		res.json(courses);
	})
);

// GET - Specific Course (selected by Pk in params) with User that belongs to it w/ 200 status code
router.get(
	'/courses/:id',
	asyncHandler(async (req, res) => {
		const course = await Course.findByPk(req.params.id, {
			attributes: [
				'id',
				'title',
				'description',
				'estimatedTime',
				'materialsNeeded',
				'userId',
			],
			include: [
				{
					model: User,
					attributes: ['id', 'firstName', 'lastName', 'emailAddress'],
				},
			],
		});
		if (course === null) {
			const error = new Error('Resource Not found.');
			error.status = 404;
			throw error;
		} else {
			res.json(course);
		}
	})
);

// POST - CREATE new USER - set location header
// to "/" and return a 201 HTTP code and no content.

router.post(
	'/users',
	asyncHandler(async (req, res) => {
		
		try {
			await User.create(req.body);
			res.status(201).location('/').end();
		} catch (error) {
			if (
				error.name === 'SequelizeValidationError' ||
				error.name === 'SequelizeUniqueConstraintError' // Added for exceeds expectations
			) {
				const errors = error.errors.map(err => err.message);
				res.status(400).json({ errors });
			} else {
				throw error;
			}
		}
	})
);

// POST - AUTHENTICATE - CREATE new COURSE
router.post(
	'/courses',
	authenticateUser, // Authenticate User
	asyncHandler(async (req, res, next) => {
		try {
			const user = req.currentUser;
			// Create new course assigned to Authorized User
			const newCourse = await Course.create({ ...req.body, userId: user.id });
			res.status(201).location(`/api/courses/${newCourse.id}`).end();
		} catch (error) {
			// Catch and handle 400 errors
			if (
				error.name === 'SequelizeValidationError' ||
				error.name === 'SequelizeUniqueConstraintError'
			) {
				const errors = error.errors.map(err => err.message);
				res.status(400).json({ errors });
			} else {
				// Throw error for global error handler to handle
				throw error;
			}
		}
	})
);

// PUT - AUTHENTICATE - UPDATE selected Course
router.put(
	'/courses/:id',
	authenticateUser,
	asyncHandler(async (req, res, next) => {
		try {
			// Update and return 204 status
			const user = req.currentUser;
			const course = await Course.findByPk(req.params.id);

			if (course === null) {
				const error = new Error('Could not find course to update');
				error.status = 404;
				throw error;
			} else if (course.userId === user.id) {
				await course.update(req.body);
				res.status(204).end();
			} else {
				res.status(403).end();
			}
		} catch (error) {
			if (
				error.name === 'SequelizeValidationError' ||
				error.name === 'SequelizeUniqueConstraintError'
			) {
				const errors = error.errors.map(error => error.message);
				res.status(400).json({ errors });
			} else {
				throw error;
			}
		}
	})
);

// POST - AUTHENTICATE - DELETE new COURSE
router.delete(
	'/courses/:id',
	authenticateUser,
	asyncHandler(async (req, res, next) => {
		try {
			const user = req.currentUser;
			const course = await Course.findByPk(req.params.id);

			if (course === null) {
				const error = new Error('Could not find course to delete.');
				error.status = 404;
				throw error;
			} else if (course.userId === user.id) {
				await course.destroy();
				res.status(204).end();
			} else {
				res.status(403).end();
			}
		} catch (error) {
			if (
				error.name === 'SequelizeValidationError' ||
				error.name === 'SequelizeUniqueConstraintError'
			) {
				const errors = error.errors.map(err => err.message);
				res.status(400).json({
					errors,
				});
			} else {
				throw error;
			}
		}
	})
);

module.exports = router;
