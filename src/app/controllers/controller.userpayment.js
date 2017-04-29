"use strict";
let c = require("../../base/base.controller");
const UserPaymentService = require("../services").UserPaymentService;

class UserPaymentController {
    static create(req, res) {
        let _service = new UserPaymentService(req, res);
        c.handleService(res, _service.create(req.body));
    }

    static updateByCriteria(req, res) {
        console.log(req.body);
        let criteria = {paymentId: req.body.paymentId, userId: req.body.userId};
        let _service = new UserPaymentService(req, res);
        c.handleService(res, _service.updateByCriteria(criteria, req.body));
    }

    static getAll(req, res) {
        let _service = new UserPaymentService(req, res);
        c.handleService(res, _service.getAll(req.body));
    }

    static addUsersToPayment(req, res) {
        let friends = req.body["friends"];
        let _service = new UserPaymentService(req, res);
        c.handleService(res, _service.addUsersToPayment(friends));
    }
}
module.exports = UserPaymentController;
