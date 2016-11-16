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

module.exports = router;