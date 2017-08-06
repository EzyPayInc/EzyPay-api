
var express = require("express");
let c = require("../base/base.controller");
var PaymentService = require("../app/services").PaymentService;

var router = express.Router();

router.post("/", (req, res) => {
    let _service = new PaymentService(req, res);
    c.handleService(res, _service.create(req.body));
});
router.put("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new PaymentService(req, res);
    c.handleService(res, _service.updateById(id, req.body));
});
router.post("/getAll", (req, res) => {
    let userId = parseInt(req.body[0].userId);
    let criteria = { "userId": userId };
    let _service = new PaymentService(req, res);
    c.handleService(res, _service.getAll(criteria));
});
router.get("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new PaymentService(req, res);
    c.handleService(res, _service.getById(id));
});
router.delete("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new PaymentService(req, res);
    c.handleService(res, _service.destroyById(id));
});
router.get("/activePayment/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new PaymentService(req, res);
    c.handleService(res, _service.getPaymentActiveByUser(id));
});
router.post("/pay", (req, res) => {
    let _service = new PaymentService(req, res);
    c.handleService(res, _service.performPayment(req.body));
});

module.exports = router;