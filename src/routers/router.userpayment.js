var express = require("express");
let c = require("../base/base.controller");
var UserPaymentService = require("../app/services").UserPaymentService;

var router = express.Router();

router.post("/", (req, res) => {
    let _service = new UserPaymentService(req, res);
    c.handleService(res, _service.create(req.body));
});
router.put("/:id", (req, res) => {
    let _service = new UserPaymentService(req, res);
    c.handleService(res, _service.updateByCriteria({
        paymentId: req.body.paymentId,
        userId: req.body.userId
    }, req.body));
});
router.post("/getAll", (req, res) => {
    let _service = new UserPaymentService(req, res);
    c.handleService(res, _service.getAll(req.body));
});
router.post("/addFriends", (req, res) => {
    let friends = req.body["friends"];
    let _service = new UserPaymentService(req, res);
    c.handleService(res, _service.addUsersToPayment(friends));
});

module.exports = router;
