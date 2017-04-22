"use strict";
let c = require("../../base/base.controller");
const PushNotificationsService = require("../services").PushNotificationsService;

class PushNotificationsController {

    static callWaiterNotification(req, res) {
        let _service = new PushNotificationsService(req, res);
        c.handleService(res, _service.callWaiterNotification(req.body.tableNumber, req.body.commerceId));
    }
}
module.exports = PushNotificationsController;
