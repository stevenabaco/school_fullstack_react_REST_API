'use strict';

const { DataTypes } = require('sequelize');

module.exports = sequalize => {
	// Model Attributes
	const Course = sequalize.define(
		'Course',
		{
			// id: {
			// 	type: DataTypes.INTEGER,
			// 	primaryKey: true,
			// 	autoIncrement: true,
			// },
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					msg: 'A course with this title already exists.',
				},
				validate: {
					notEmpty: {
						msg: ' A course title is required',
					},
					notNull: {
						msg: 'Please provide a course title.',
					},
				},
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: ' A description is required.',
					},
					notNull: {
						msg: 'Please provide a descrition.',
					},
				},
			},
			estimatedTime: {
				type: DataTypes.STRING,
			},
			materialsNeeded: {
				type: DataTypes.STRING,
			},
		},
		{ sequalize }
	);

	Course.associate = models => {
		Course.belongsTo(models.User, {
			foreignKey: {
				fieldName: 'userId',
				allowNull: false,
			},
		});
	};
	return Course;
};
