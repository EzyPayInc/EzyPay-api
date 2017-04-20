"use strict";
let c = require("../../base/base.controller");
const PushNotificationsService = require("../services").PushNotificationsService;

class PushNotificationsController {
    static sendNotification(req, res) {
        let _service = new PushNotificationsService(req, res);
        _service.sendNotification();
    }
}
module.exports = PushNotificationsController;
