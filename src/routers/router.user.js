var express = require("express");
// var authenticated = require("../config/policies/authenticated");
var UserController = require("../app/controllers").UserController;

var router = express.Router();
//noinspection JSUnresolvedFunction
router.post("/", UserController.create);
//noinspection JSUnresolvedFunction
router.post("/getAll", UserController.getAll);
//noinspection JSUnresolvedFunction
router.get("/:id", UserController.getById);
//noinspection JSUnresolvedFunction
router.put('/:id', UserController.updateById);
//noinspection JSUnresolvedFunction
router.get('/validate/:id', UserController.validateAccount);
//noinspection JSUnresolvedFunction
router.post('/validatePhoneNumbers', UserController.validatePhoneNumbers);
//noinspection JSUnresolvedFunction
router.post('/uploadImage/:id', UserController.uploadUserImage);

module.exports = router;