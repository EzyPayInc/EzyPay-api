var UserController = require("../app/controllers").UserController;
var GCloudStorage = require("../app/services").GCloudStorage;
var policies = require("../policies");
var config = require("../config");
var express = require("express");

var router = express.Router();
router.post("/",
    policies.ClientAuth,
    UserController.create);
router.post("/getAll",
    policies.BearerAuth,
    UserController.getAll);
router.get("/:id",
    policies.BearerAuth,
    UserController.getById);
router.put('/:id',
    policies.BearerAuth,
    UserController.updateById);
router.get('/validate/:id',
    policies.BearerAuth,
    UserController.validateAccount);
router.post('/validatePhoneNumbers',
    policies.BearerAuth,
    UserController.validatePhoneNumbers);
router.post('/uploadImage/:id',
    policies.BearerAuth,
    config.multer.single('image'),
    GCloudStorage.sendUploadToGCS,
    UserController.uploadUserImage);
router.get('/history/:id',
    policies.BearerAuth,
    UserController.userHistory);
router.get('/history/dates/:id',
    policies.BearerAuth,
    UserController.userHistoryDates);

module.exports = router;