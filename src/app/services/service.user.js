const BaseService = require("../../base/base.service").Service;
var path = require('path');
var EmailHandler = require("../util/Email/EmailHandler").EmailHandler;
var fs = require('fs');

class UserService extends BaseService {

	create(data) {
		return new Promise((resolve, reject) => {
			//noinspection JSUnresolvedFunction
			this.Models.User.create(data).then(
				(user)=> {
					if(data.tablesQuantity <= 0) {
                        resolve(user.id);
					} else {
						 this.insertTables(user.id, data.tablesQuantity).then(
							 (result)=> resolve(user.id),
							 (error)=> reject(error)
						 );
					}
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
					resolve(result);
				}, (error)=> reject(error));
            }, (error)=> reject(error));
        });
    }

	getUserProfileImage(id)
	{
        return new Promise((resolve, reject) => {
            this.getById(id).then(
                (user)=> {
                	var file = this.getFile(user.avatar);
                	if(file == null) {
                		reject("Not found");
					} else {
                        resolve(file);
					}
                },
                (error)=> {
                	reject(error);
                }
            );
        });
	}

	insertTables(commerceId, tablesQuantity) {
        return this.DBs[0].query('CALL sp_insertTables('+commerceId+', '+tablesQuantity+');');
	}
}
module.exports = UserService;