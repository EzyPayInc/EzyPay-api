"use strict";
let c = require("../../base/base.controller");
const CardService = require("../services").CardService;

class CardController {
	static create(req, res) {
		let _service = new CardService(req, res);
		c.handleService(res, _service.create(req.body));
	}

	static updateById(req, res) {
        console.log(req.body);
		let id = parseInt(req.params["id"]);
		let _service = new CardService(req, res);
		c.handleService(res, _service.updateById(id, req.body));
	}

	static getAll(req, res) {
		//let userId = parseInt(req.body[0].userId);
		let criteria = {"userId": 0};
		let _service = new CardService(req, res);
		c.handleService(res, _service.getAll(criteria));
	}

	static getById(req, res) {
		let id = parseInt(req.params["id"]);
		let _service = new CardService(req, res);
		c.handleService(res, _service.getById(id));
	}

	static destroy(req, res) {
		let id = parseInt(req.params["id"]);
		let customer = parseInt(req.params["customer"]);
		let _service = new CardService(req, res);
		c.handleService(res, _service.destroy(id, customer));
	}
}
module.exports = CardController;