"use strict";
let c = require("../../base/base.controller");
const DeviceTokenService = require("../services").DeviceTokenService;

class DeviceTokenController {
    static create(req, res) {
        let _service = new DeviceTokenService(req, res);
        c.handleService(res, _service.create(req.body));
    }

    static updateById(req, res) {
        let id = parseInt(req.params["id"]);
        let _service = new DeviceTokenService(req, res);
        c.handleService(res, _service.updateById(id, req.body));
    }

    static getAll(req, res) {
        let userId = parseInt(req.body[0].userId);
        let criteria = {"userId":  userId};
        let _service = new DeviceTokenService(req, res);
        c.handleService(res, _service.getAll(criteria));
    }

    static getById(req, res) {
        let id = parseInt(req.params["id"]);
        let _service = new DeviceTokenService(req, res);
        c.handleService(res, _service.getById(id));
    }
}
module.exports = DeviceTokenController;
