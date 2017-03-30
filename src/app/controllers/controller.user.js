"use strict";
let c = require("../../base/base.controller");
const UserService = require("../services").UserService;

class UserController {
	static create(req, res) {
		let _service = new UserService(req, res);
		c.handleService(res, _service.create(req.body));
	}

	static getAll(req, res) {
		let _service = new UserService(req, res);
		c.handleService(res, _service.getAll(req.body));
	}

	static getById(req, res) {
		let id = parseInt(req.params["id"]);
		let _service = new UserService(req, res);
		c.handleService(res, _service.getById(id));
	}

	static updateById(req, res) {
		let id = parseInt(req.params["id"]);
		let _service = new UserService(req, res);
		c.handleService(res, _service.updateById(id, req.body));
	}

	static validateAccount(req, res) {
		//TODO: se debe enviar un codigo de confirmacion
		let id = parseInt(req.params["id"]);
		let _service = new UserService(req, res);
		c.handleService(res, _service.validateAccount(id));
	}

    static validatePhoneNumbers(req, res) {
        let phoneNumbers = req.body["phoneNumbers"];
        let _service = new UserService(req, res);
        c.handleService(res, _service.validatePhoneNumbers(phoneNumbers));
    }

    static uploadUserImage(req, res) {
        let _service = new UserService(req, res);
        c.handleService(res, _service.uploadUserImage());
	}

    static downloadUserImage(req, res) {
        let id = parseInt(req.params["id"]);
        let _service = new UserService(req, res);
        c.handleFileService(res, _service.getUserProfileImage(id));
    }
}
module.exports = UserController;