var EmailHandler = require("../util/Email/EmailHandler").EmailHandler;
const BaseService = require("../../base/base.service").Service;
const GreenPayService = require("./service.greenpay");

class UserService extends BaseService {

	create(data) {
		var greenPayService = new GreenPayService(this.req, this.res);
		if(data.userType == 1) {
			return new Promise((resolve, reject) => {
				//noinspection JSUnresolvedFunction
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
					if (data.tablesQuantity <= 0) {
						resolve(user);
					} else {
						this.insertTables(user.id, data.tablesQuantity).then(
							(result) => resolve(user),
							(error) => reject(error)
						);
					}
				},
				(error) => reject(error)
			);
		});
	}

	getAll(criteria) {
		//noinspection JSUnresolvedFunction
		return this.Models.User.findAll({ where: criteria });
	}

	getById(id) {
		//noinspection JSUnresolvedFunction
		return this.Models.User.findById(id);
	}

	updateById(id, data) {
		return this.Models.User.update(data, { where: { "id": id } });
	}

	validateAccount(id) {
		return this.Models.User.update({
			isValidatedAccount: 1
		}, { where: { "id": id } });
	}

	validatePhoneNumbers(phoneNumbers) {
		return this.Models.User.findAll({
			where: { phoneNumber: { $in: phoneNumbers } }
		});
	}

	uploadUserImage() {
		return this.Models.User.update({
			avatar: this.req.file.csObject
		}, { where: { "id": this.user.id } });
	}

	insertTables(commerceId, tablesQuantity) {
		return this.DBs[0].query('CALL sp_insertTables('
			+ commerceId + ', ' + tablesQuantity + ');');
	}
}
module.exports = UserService;