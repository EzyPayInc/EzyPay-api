var express = require("express");
// var authenticated = require("../config/policies/authenticated");
var ClientController = require("../app/controllers").ClientController;

var router = express.Router();
//noinspection JSUnresolvedFunction
router.post("/", ClientController.create);
//noinspection JSUnresolvedFunction
router.post("/getAll", ClientController.getAll);
//noinspection JSUnresolvedFunction
router.get("/:id", ClientController.getById);

module.exports = router;