"use strict";
var CryptoService = require("../../base/crypto.service").CryptoService;
const config = require('../../config');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		id: {
			field: 'userId',
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true
		},
		email: {
			unique: true,
			type: DataTypes.STRING,
			validate: { notEmpty: true }
		},
		password: {
			type: DataTypes.STRING,
			validate: { notEmpty: true, min: 8 }
		},
		userType: DataTypes.INTEGER,
		name: DataTypes.STRING,
		lastName: DataTypes.STRING,
		phoneNumber: DataTypes.STRING,
		isActive: DataTypes.BOOLEAN,
		isValidatedAccount: DataTypes.BOOLEAN,
		avatar: DataTypes.STRING,
		boss: DataTypes.INTEGER,
		customerId: DataTypes.INTEGER
	}, {
			timestamps: false,
			freezeTableName: true,
			tableName: "tb_user",
			hooks: {
				beforeCreate: (user, options) => {
					return new Promise((resolve, reject) => {
						CryptoService.crypt(user.password).then((hashedPassword) => {
							user.createdAt = new Date();
							user.password = hashedPassword;
							resolve(user);
						}, (error) => {
							reject(error);
						});
					});
				},
				beforeUpdate: (user, options) => {
					return new Promise((resolve, reject) => {
						if (user.password) {
							CryptoService.crypt(user.password).then((hashedPassword) => {
								user.password = hashedPassword;
								resolve(user);
							}, (error) => {
								reject(error);
							});
						} else {
							resolve(user);
						}
					});
				}
			}
		});

	User.prototype.toJSON = function () {
		var values = this.get();
		delete values.password;
		if (values.avatar) {
			values.avatar = config.parameters.
				cloud_file_url(values.avatar);
		}
		return values;
	};

	User.prototype.verifyPassword = function (password) {
		return CryptoService.compare(password, this.password);
	};

	return User;
};
