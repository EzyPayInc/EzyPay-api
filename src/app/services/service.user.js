const BaseService = require("../../base/base.service").Service;
var EmailHandler = require("../util/Email/EmailHandler").EmailHandler;

class UserService extends BaseService {

	create(data) {
		return new Promise((resolve, reject) => {
			//noinspection JSUnresolvedFunction
			this.Models.User.create(data).then(
				(user) => {
					if (data.tablesQuantity <= 0) {
						resolve(user.id);
					} else {
						this.insertTables(user.id, data.tablesQuantity).then(
							(result) => resolve(user.id),
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