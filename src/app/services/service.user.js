const BaseService = require("../../base/base.service").Service;
const GreenPayService = require("./service.greenpay");
const config = require('../../config');

class UserService extends BaseService {

	create(data) {
		var greenPayService = new GreenPayService(this.req, this.res);
		if (data.userType == 1) {
			return new Promise((resolve, reject) => {
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
		return this.saveUser(data);
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
}
module.exports = UserService;