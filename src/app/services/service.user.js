const BaseService = require("../../base/base.service").Service;
var path = require('path');
var EmailHandler = require("../util/Email/EmailHandler").EmailHandler;
var fs = require('fs');
var formidable = require('formidable');


class UserService extends BaseService {

	create(data) {
		var emailHandler = new EmailHandler();
		return new Promise((resolve, reject) => {
			//noinspection JSUnresolvedFunction
			this.Models.User.create(data).then(
				(user)=> {
					//emailHandler.sendUserValidation(user);
					resolve(user.id);
				},
				(error)=> reject(error)
			);
		});
	}

	getAll(criteria) {
		//noinspection JSUnresolvedFunction
		return this.Models.User.findAll({where: criteria});
	}

	getById(id) {
		//noinspection JSUnresolvedFunction
		return this.Models.User.findById(id);
	}

	updateById(id, data) {
		return this.Models.User.update(data, {where: {"id": id}});
	}

	validateAccount(id) {
		return this.Models.User.update({
			isValidatedAccount: 1
		}, {where: {"id": id}});
	}

	validatePhoneNumbers(phoneNumbers) {
        return this.Models.User.findAll({
        	where: { phoneNumber: {$in: phoneNumbers}}
        });
	}

	updateUserImage(id, filename) {
		return this.Models.User.update({
			avatar : filename
		}, {where: {"id": id}});
	}



   uploadUserImage() {
        return new Promise((resolve, reject)=> {
            this.upload(true).then((data)=> {
				var filename = "upload_" + data[0].path.split("_")[1];
				this.updateUserImage(this.user.id, filename).then((result) => {
					resolve(filename);
				}, (error)=> reject(error));
            }, (error)=> reject(error));
        });
    } //end uploadFile
}
module.exports = UserService;