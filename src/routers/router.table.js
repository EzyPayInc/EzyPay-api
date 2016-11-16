var express = require("express");
// var authenticated = require("../config/policies/authenticated");
var TableController = require("../app/controllers").TableController;

var router = express.Router();
//noinspection JSUnresolvedFunction
router.post("/", TableController.create);
//noinspection JSUnresolvedFunction
router.post("/getAll", TableController.getAll);
//noinspection JSUnresolvedFunction
router.get("/:id", TableController.getById);
//noinspection JSUnresolvedFunction
router.put('/:id', TableController.updateById);

module.exports = router;