/**
 * Created by gustavoquesada on 4/7/17.
 */
"use strict";
let c = require("../../base/base.controller");
const CurrencyService = require("../services").CurrencyService;

class CurrencyController {
    static create(req, res) {
        let _service = new CurrencyService(req, res);
        c.handleService(res, _service.create(req.body));
    }

    static updateById(req, res) {
        let id = parseInt(req.params["id"]);
        let _service = new CurrencyService(req, res);
        c.handleService(res, _service.updateById(id, req.body));
    }

    static getAll(req, res) {
        let _service = new CurrencyService(req, res);
        c.handleService(res, _service.getAll(req.body));
    }

    static getById(req, res) {
        let id = parseInt(req.params["id"]);
        let _service = new CurrencyService(req, res);
        c.handleService(res, _service.getById(id));
    }
}
module.exports = CurrencyController;