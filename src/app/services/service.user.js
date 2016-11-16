const BaseService = require("../../base/base.service").Service;
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var EmailHandler = require("../util/Email/EmailHandler").EmailHandler;

class UserService extends BaseService {

	create(data) {
		var emailHandler = new EmailHandler();
		return new Promise((resolve, reject) => {
			//noinspection JSUnresolvedFunction
			this.Models.User.create(data).then(
				(user)=> {
					emailHandler.sendUserValidation(user);
					resolve(user.id);
				},
				(error)=> reject(error)
			);
		});
	}

	getAll(criteria) {
		//noinspection JSUnresolvedFunction
		return this.Models.Table.findAll({where: criteria});
	}

	getById(id) {
		//noinspection JSUnresolvedFunction
		return this.Models.Table.findById(id);
	}

	updateById(id, data) {
		return this.Models.Table.update(data, {where: {"id": id}});
	}

	validateAccount(id) {
		return this.Models.Table.update({
			isValidatedAccount: 1
		}, {where: {"id": id}});
	}

	uploadProfileImage(req, res) {
		var form = new formidable.IncomingForm();
		form.multiples = true;
		form.uploadDir = path.join(__dirname, '/uploads');
		form.on('file', function (field, file) {
			fs.rename(file.path, path.join(form.uploadDir, file.name));
		});
		form.on('error', function (err) {
			var response = {"error": err.message};
			res.status(500).json(response);
		});
		form.on('end', function () {
			var response = {"response": "success"};
			res.status(200).json(response);
		});
		form.parse(req);
	}
}
module.exports = UserService;