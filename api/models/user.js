'use strict';
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = sequelize => {
	const User = sequelize.define('User', {
		// Model attributes
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: ' A first name is required. ',
				},
				notNull: {
					msg: ' Please enter a first name for your account. ',
				},
			},
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: ' A last name is required. ',
        },
        notNull: {
          msg: ' Please enter a last name for your account. '
        }
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: ' The email you entered has already been registered.'
      },
      validate: {
        isEmail: {
          msg: "Please enter a valid email for your account.",
        },
        notEmpty: {
          msg: "A valid email is required."
        },
        notNull: {
          msg: "Please enter a valid email for your account."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "A password is required."
        },
        notNull: {
          msg: "Please provide a password for your account."
        }
      },
      set(value) {
        if (value !== "") {
          this.setDataValue('password', bcrypt.hashSync(value, 10));
        }
      }
    }
  }, {
    sequelize
  });
  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      }
    })
  }
  return User;
};
