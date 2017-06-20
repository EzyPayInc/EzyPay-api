var express = require("express");
var BankAccountController = require("../app/controllers").BankAccountController;

var router = express.Router();
//noinspection JSUnresolvedFunction
router.post("/", BankAccountController.create);
//noinspection JSUnresolvedFunction
router.put("/:id", BankAccountController.updateById);
//noinspection JSUnresolvedFunction
router.post("/getAll", BankAccountController.getAll);
//noinspection JSUnresolvedFunction
router.get("/:id", BankAccountController.getById);

module.exports = router;
