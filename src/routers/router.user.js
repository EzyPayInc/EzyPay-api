var express = require("express");
// var authenticated = require("../config/policies/authenticated");
var UserController = require("../app/controllers").UserController;
var PushNotificationsController = require("../app/controllers").PushNotificationsController;
var policies = require("../policies");

var router = express.Router();
//noinspection JSUnresolvedFunction
router.post("/", UserController.create);
//noinspection JSUnresolvedFunction
router.post("/getAll", policies.BearerAuth, UserController.getAll);
//noinspection JSUnresolvedFunction
router.get("/:id", policies.BearerAuth, UserController.getById);
//noinspection JSUnresolvedFunction
router.put('/:id', policies.BearerAuth, UserController.updateById);
//noinspection JSUnresolvedFunction
router.get('/validate/:id', policies.BearerAuth, UserController.validateAccount);
//noinspection JSUnresolvedFunction
router.post('/validatePhoneNumbers', policies.BearerAuth, UserController.validatePhoneNumbers);
//noinspection JSUnresolvedFunction
router.post('/uploadImage/:id', policies.BearerAuth, UserController.uploadUserImage);
router.get('/downloadImage/:id', UserController.downloadUserImage);
router.post('/pushNotification/', PushNotificationsController.sendNotification);

module.exports = router;