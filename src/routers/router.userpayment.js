var express = require("express");
var UserPaymentController = require("../app/controllers").UserPaymentController;

var router = express.Router();
//noinspection JSUnresolvedFunction
router.post("/", UserPaymentController.create);
//noinspection JSUnresolvedFunction
router.put("/:id", UserPaymentController.updateByCriteria);
//noinspection JSUnresolvedFunction
router.post("/getAll", UserPaymentController.getAll);
//noinspection JSUnresolvedFunction
router.post("/addFriends", UserPaymentController.addUsersToPayment);

module.exports = router;
