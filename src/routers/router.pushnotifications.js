var express = require("express");
var PushNotificationsController = require("../app/controllers").PushNotificationsController;

var router = express.Router();
//noinspection JSUnresolvedFunction
router.post('/callWaiter', PushNotificationsController.callWaiterNotification);

module.exports = router;