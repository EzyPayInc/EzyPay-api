"use strict";
let c = require("../../base/base.controller");
const RestaurantService = require("../services").RestaurantService;

class RestaurantController {
	static create(req, res) {
		let _service = new RestaurantService(req, res);
		c.handleService(res, _service.create(req.body));
	}

	static getAll(req, res) {
		let _service = new RestaurantService(req, res);
		c.handleService(res, _service.getAll(req.body));
	}

	static getById(req, res) {
		let id = parseInt(req.params["id"]);
		let _service = new RestaurantService(req, res);
		c.handleService(res, _service.getById(id));
	}

	static updateById(req, res) {
		let id = parseInt(req.params["id"]);
		let _service = new RestaurantService(req, res);
		c.handleService(res, _service.updateById(id, req.body));
	}
}
module.exports = RestaurantController;