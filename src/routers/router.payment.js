
var express = require("express");
var PaymentenController = require("../app/controllers").PaymentController;

var router = express.Router();
//noinspection JSUnresolvedFunction
router.post("/", PaymentenController.create);
//noinspection JSUnresolvedFunction
router.put("/:id", PaymentenController.updateById);
//noinspection JSUnresolvedFunction
router.post("/getAll", PaymentenController.getAll);
//noinspection JSUnresolvedFunction
router.get("/:id", PaymentenController.getById);
//noinspection JSUnresolvedFunction
router.get("/activePayment/:id", PaymentenController.getPaymentActiveByUser);
//noinspection JSUnresolvedFunction
router.post("/test/:id", PaymentenController.testPayment);


module.exports = router;