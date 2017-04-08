/**
 * Created by gustavoquesada on 4/7/17.
 */
var express = require("express");
var CurrencyController = require("../app/controllers").CurrencyController;

var router = express.Router();
//noinspection JSUnresolvedFunction
router.post("/", CurrencyController.create);
//noinspection JSUnresolvedFunction
router.put("/:id", CurrencyController.updateById);
//noinspection JSUnresolvedFunction
router.post("/getAll", CurrencyController.getAll);
//noinspection JSUnresolvedFunction
router.get("/:id", CurrencyController.getById);

module.exports = router;