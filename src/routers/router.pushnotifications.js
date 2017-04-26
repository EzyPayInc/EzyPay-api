var express = require("express");
var PushNotificationsController = require("../app/controllers").PushNotificationsController;

var router = express.Router();
//noinspection JSUnresolvedFunction
router.post('/callWaiter', PushNotificationsController.callWaiterNotification);
//noinspection JSUnresolvedFunction
router.post('/billRequest', PushNotificationsController.billRequestNotification);
//noinspection JSUnresolvedFunction
router.post('/sendBill', PushNotificationsController.sendBillNotification);
module.exports = router;