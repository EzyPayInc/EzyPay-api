"use strict";
let c = require("../../base/base.controller");
const DeviceTokenService = require("../services").DeviceTokenService;

class DeviceTokenController {
    static create(req, res) {
        let _service = new DeviceTokenService(req, res);
        c.handleService(res, _service.insert(req.body));
    }

    static updateById(req, res) {
        let id = parseInt(req.params["id"]);
        let _service = new DeviceTokenService(req, res);
        c.handleService(res, _service.updateById(id, req.body));
    }

    static getAll(req, res) {
        let _service = new DeviceTokenService(req, res);
        c.handleService(res, _service.getAll(req.body));
    }

    static getById(req, res) {
        let id = parseInt(req.params["id"]);
        let _service = new DeviceTokenService(req, res);
        c.handleService(res, _service.getById(id));
    }

    static destroy(req, res) {
        let id = parseInt(req.params["id"]);
        let _service = new DeviceTokenService(req, res);
        c.handleService(res, _service.destroy(id));
    }

    static destroyAll(req, res) {
        let _service = new DeviceTokenService(req, res);
        c.handleService(res, _service.destroyAll(req.body));
    }
}
module.exports = DeviceTokenController;
