var router = require("express").Router();
var UserPaymentService = require("../app/services").UserPaymentService;

router.post("/", (req, res) => {
    let _service = new UserPaymentService(req, res);
    _service.handle(_service.create(req.body));
});
router.put("/:id", (req, res) => {
    let _service = new UserPaymentService(req, res);
    _service.handle(_service.updateByCriteria({
        paymentId: req.body.paymentId,
        userId: req.body.userId
    }, req.body));
});
router.post("/getAll", (req, res) => {
    let _service = new UserPaymentService(req, res);
    _service.handle(_service.getAll(req.body));
});
router.post("/addFriends", (req, res) => {
    let friends = req.body["friends"];
    let _service = new UserPaymentService(req, res);
    _service.handle(_service.addUsersToPayment(friends));
});

module.exports = router;
