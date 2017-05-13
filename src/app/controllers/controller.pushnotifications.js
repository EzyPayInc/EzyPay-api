"use strict";
let c = require("../../base/base.controller");
const PushNotificationsService = require("../services").PushNotificationsService;

class PushNotificationsController {

    static callWaiterNotification(req, res) {
        let _service = new PushNotificationsService(req, res);
        c.handleService(res, _service.callWaiterNotification(req.body.tableNumber, req.body.commerceId, req.body.paymentId));
    }

    static billRequestNotification(req, res) {
        let _service = new PushNotificationsService(req, res);
        c.handleService(res, _service.billRequestNotification(req.body.tableNumber, req.body.commerceId, req.body.paymentId));
    }

    static sendBillNotification(req, res) {
        let _service = new PushNotificationsService(req, res);
        c.handleService(res, _service.sendBillNotification(req.body.clientId, req.body.amount, req.body.currencyCode, req.body.paymentId));
    }

    static splitRequestNotification(req, res) {
        let _service = new PushNotificationsService(req, res);
        c.handleService(res, _service.splitRequestNotification(req.body.data.payment, req.body.data.friends));
    }

    static responseSplitRequestNotification(req, res) {
        let _service = new PushNotificationsService(req, res);
        c.handleService(res, _service.responseSplitRequestNotification(req.body.userId, req.body.paymentId, req.body .response));
    }
}
module.exports = PushNotificationsController;
