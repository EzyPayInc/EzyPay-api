"use strict";
let c = require("../../base/base.controller");
const BankAccountService = require("../services").BankAccountService;

class BankAccountController {
    static create(req, res) {
        let _service = new BankAccountService(req, res);
        c.handleService(res, _service.create(req.body));
    }

    static updateById(req, res) {
        let id = parseInt(req.params["id"]);
        let _service = new BankAccountService(req, res);
        c.handleService(res, _service.updateById(id, req.body));
    }

    static getAll(req, res) {
        let _service = new BankAccountService(req, res);
        c.handleService(res, _service.getAll(req.body));
    }

    static getById(req, res) {
        let id = parseInt(req.params["id"]);
        let _service = new BankAccountService(req, res);
        c.handleService(res, _service.getById(id));
    }
}
module.exports = BankAccountController;
