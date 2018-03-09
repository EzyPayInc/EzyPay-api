const BaseService = require("../../base/base.service").Service;
const EmailService = require("../../base/service.email");
const GreenPayService = require("./service.greenpay");
const config = require('../../config');
const shortid = require('shortid');
const util = require('util');
var path = require('path');
var fs = require("fs");

class UserService extends BaseService {

	create(data) {
		return new Promise((resolve, reject) =>{
			var criteria = { email:data.email };
			this.getAll(criteria).then(
				(user) => {
					if(user.length == 0) {
						if (data.userType == 1) {
							this.saveGreenPayService(data).then(
								(result) => resolve(result),
								(error) => reject(error)
							);
						} else {
							this.saveUser(data).then(
								(result) => resolve(result),
								(error) => reject(error)
							);
						}
					} else {
						let error = {message : "UNIQUE_EMAIL"};
						reject(error);
					}
				},
				(error) => reject(error)
			)
		});
	}

	saveGreenPayService(data) {
		return new Promise((resolve, reject) => {
			let greenPayService = new GreenPayService(this.req, this.res);
			greenPayService.createCustomer(data).then(
				(response) => {
					data.customerId = response.id;
					this.saveUser(data).then(
						(result) => resolve(result),
						(error) => reject(error)
					);
				},
				(error) => reject(error)
			);
		});
	}

	saveUser(data) {
		return new Promise((resolve, reject) => {
			this.Models.User.create(data).then(
				(user) => {
					if (data.tablesQuantity && data.tablesQuantity > 0) {
						this.insertTables(user.id, data.tablesQuantity);
						// .then(
						// (result) => resolve(user),
						// (error) => reject(error)
						// );
					}
					if (data.credentials) {
						data.credentials.userId = user.id;
						this.Models.UserCredential.create(data.credentials);
					}
					resolve(user);
				},
				(error) => reject(error)
			);
		});
	}

	getAll(criteria) {
		return this.Models.User.findAll({ where: criteria });
	}

	validateEmail(data) {
		return new Promise((resolve, reject) => {
			this.getAll(data).then(
				(result) => {
					if(result.length > 0) {
						resolve({user:1});
					} else {
						resolve({user:0});
					}
				},
				(error) => reject(error)
			);
		});
	}

	getById(id) {
		return this.Models.User.findById(id);
	}

	updateById(id, data) {
		return this.Models.User.update(data, { where: { "id": id } });
	}

	update(criteria, data)
	{
		return this.Models.User.update(data, criteria);
	}

	validateAccount(id) {
		return this.Models.User.update({
			isValidatedAccount: 1
		}, { where: { "id": id } });
	}

	validatePhoneNumbers(phoneNumbers) {
		var criteria = {
			phoneNumber: { $in: phoneNumbers },
			$and: {
				phoneNumber: { $not: this.user.phoneNumber }
			},
			userType: 1
		};
		return this.Models.User.findAll({
			where: criteria
		});
	}

	uploadUserImage() {
		return new Promise((resolve, reject) => {
			this.Models.User.update({
				avatar: this.req.file.csObject
			}, {
					where: { "id": this.user.id }
				}).then(
				(result) => {
					this.user.avatar = config.parameters.cloud_file_url(this.req.file.csObject);
					resolve(this.user)
				},
				(error) => reject(error)
				);
		});
	}

	insertTables(commerceId, tablesQuantity) {
		return this.DBs[0].query('CALL sp_insertTables('
			+ commerceId + ', ' + tablesQuantity + ');');
	}

	userHistory(userId) {
		return this.DBs[0].query('CALL sp_getUserHistory('
			+ userId + ');');
	}

	userHistoryDates(userId) {
		return this.DBs[0].query('CALL sp_userHistoryDates('
			+ userId + ');');
	}

	commerceHistory(commerceId) {
		return this.DBs[0].query('CALL sp_getCommerceHistory('
			+ commerceId + ');');
	}

	commerceHistoryDates(commerceId) {
		return this.DBs[0].query('CALL sp_commerceHistoryDates('
			+ commerceId + ');');
	}

	updatePassword(data) {
		return new Promise((resolve, reject) => {
			var criteria = { email: data.email };
			return this.getAll(criteria).then(
				(result) => {
					if (result.length > 0) {
						var user = {
							password: data.newPassword
						}
						var criteria = { where: { "id": result[0].id }, individualHooks: true };
						this.update(criteria, user).then(
							(result) => resolve(result),
							(error) => reject(error)
						)
					}
				},
				(error) => reject(error)
			)
		})
	}

	passwordRecovery(data) {
		return new Promise((resolve, reject) => {
			var newObject = {
				userEmail : data.email,
				token : shortid.generate()
			};
			this.Models.PasswordRecovery.create(newObject).then(
				(result) => {
					resolve(result);
					var criteria = {
						email : data.email
					};
					this.getAll(criteria).then(
						(user) => {
							if(user.length > 0) {
								let emailBody =  util.format(this.localizedStrings.emailPasswordReset, user[0].name, user[0].lastName, 
								"https://ugwo-platform.appspot.com/user/password/" + newObject.token);
								var email = {
									email : newObject.userEmail,
									subject : "Ugwo Password Reset",
									body : emailBody
								};
								let emailService = new EmailService();
								emailService.sendEmail(email);
							}
						},
						(error) => console.log(error)
					);
				},
				(error) => reject(error)
			);
		});
	}

	validateToken(token) {
		var criteria = {
			token : token
		};
		return this.Models.PasswordRecovery.findAll({ where : criteria });
	}

	displayRecoveryPasswordView(token) {
		this.validateToken(token).then(
			(result) => {
				if(result.length == 0) {
					this.res.status(404).send('Not found');
					return;
				}
				var self = this;
				fs.readFile(path.join(__dirname, '../views/change_password.html'), function (err, html) {
					if(err) {
						self.res.status(500).json({
							message: err.message
						});
						return;
					}
					self.res.writeHeader(200, {"Content-Type": "text/html"});  
					self.res.write(html);  
					self.res.end();
				});
			},
			(error) => {
				this.res.status(404).send('Not found');
				return;
			}
		);
	}

	recoveryPassword(token, data) {
		this.validateToken(token).then(
			(result) => {
				if(result.length == 0 || result[0].userEmail != data.email) {
					this.res.status(404).send('Not found');
					return;
				}
				this.updatePassword(data).then(
					(user) => {
						this.resetAuthData(data.email);
						this.res.status(200).json(
							{message : "Successfully"}
						);
					},
					(error) => {
						this.res.status(500).json(
							{message : error.message}
						);
					}
				)
			},
			(error) => {
				this.res.status(500).json(
					{message : error.message}
				);
			}
		);
	}

	resetAuthData (email) {
		this.getAll({email:email}).then(
			(user) => {
				if(user.length > 0) {
					this.Models.PasswordRecovery.destroy({where: {userEmail : email}});
					this.Models.Token.destroy({where: {userId : user[0].id}});
				}
			}
		);
	}

}
module.exports = UserService;