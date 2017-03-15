"use strict";
var CryptoService = require("../../base/crypto.service").CryptoService;
module.exports = (sequelize, DataTypes)=> {
	//noinspection JSUnusedGlobalSymbols
	return sequelize.define('User', {
		id: {
			field: 'userId',
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement : true
		},
		email: {
			unique: true,
			type: DataTypes.STRING,
			validate: {notEmpty: true, isEmail: true}
		},
		password: {
			type: DataTypes.STRING,
			validate: {notEmpty: true, min: 8}
		},
		userType: DataTypes.INTEGER,
		name: DataTypes.STRING,
		lastName: DataTypes.STRING,
		phoneNumber: DataTypes.STRING,
		isActive: DataTypes.BOOLEAN,
		isValidatedAccount: DataTypes.BOOLEAN
	}, {
		timestamps: false,
		freezeTableName: true,
		tableName: "tb_user",
		hooks: {
			beforeCreate: (user, options, next)=> {
				CryptoService.crypt(user.password).then((hashedPassword)=> {
						user.createdAt = new Date();
						user.password = hashedPassword;
						// sequenceService.getNextSequence("tb_user").then(
						// 	(result:any)=> {
						// 		user.id = result.id;
						next(null, user);
						// 	}, (error)=>next(error)
						// );
					}, (error)=>next(error)
				);
			},
			beforeUpdate: (user, options, next)=> {
				if (user.password) {
					CryptoService.crypt(user.password).then((hashedPassword)=> {
							user.password = hashedPassword;
							next(null, user);
						}, (error)=>next(error)
					);
				} else {
					next(null, user);
				}
			}
		},
		instanceMethods: {
			toJSON: function () {
				//noinspection JSUnresolvedFunction
				var values = this.get();
				delete values.password;
				return values;
			},
			verifyPassword: function (password) {
				return CryptoService.compare(password, this.password);
			}
		}
	});
};