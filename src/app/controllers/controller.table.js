"use strict";
let c = require("../../base/base.controller");
const TableService = require("../services").TableService;

class TableController {
	static create(req, res) {
		let _service = new TableService(req, res);
		c.handleService(res, _service.create(req.body));
	}

	static getAll(req, res) {
		let _service = new TableService(req, res);
		c.handleService(res, _service.getAll(req.body));
	}

	static getById(req, res) {
		let id = parseInt(req.params["id"]);
		let _service = new TableService(req, res);
		c.handleService(res, _service.getById(id));
	}

	static updateById(req, res) {
		let id = parseInt(req.params["id"]);
		let _service = new TableService(req, res);
		c.handleService(res, _service.updateById(id, req.body));
	}
}
module.exports = TableController;