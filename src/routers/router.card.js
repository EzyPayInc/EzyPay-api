var express = require("express");
// var authenticated = require("../config/policies/authenticated");
var CardController = require("../app/controllers").CardController;

var router = express.Router();
//noinspection JSUnresolvedFunction
router.post("/", CardController.create);
//noinspection JSUnresolvedFunction
router.put("/:id", CardController.updateById);
//noinspection JSUnresolvedFunction
router.post("/getAll", CardController.getAll);
//noinspection JSUnresolvedFunction
router.get("/:id", CardController.getById);

module.exports = router;