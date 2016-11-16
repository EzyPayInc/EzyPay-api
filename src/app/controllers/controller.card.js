"use strict";
let c = require("../../base/base.controller");
const CardService = require("../services").CardService;

class CardController {
	static create(req, res) {
		let _service = new CardService(req, res);
		c.handleService(res, _service.create(req.body));
	}

	static getAll(req, res) {
		let _service = new CardService(req, res);
		c.handleService(res, _service.getAll(req.body));
	}

	static getById(req, res) {
		let id = parseInt(req.params["id"]);
		let _service = new CardService(req, res);
		c.handleService(res, _service.getById(id));
	}
}
module.exports = CardController;