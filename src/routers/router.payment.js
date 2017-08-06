var router = require("express").Router();
var PaymentService = require("../app/services").PaymentService;

router.post("/", (req, res) => {
    let _service = new PaymentService(req, res);
    _service.handle(_service.create(req.body));
});
router.put("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new PaymentService(req, res);
    _service.handle(_service.updateById(id, req.body));
});
router.post("/getAll", (req, res) => {
    let userId = parseInt(req.body[0].userId);
    let criteria = { "userId": userId };
    let _service = new PaymentService(req, res);
    _service.handle(_service.getAll(criteria));
});
router.get("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new PaymentService(req, res);
    _service.handle(_service.getById(id));
});
router.delete("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new PaymentService(req, res);
    _service.handle(_service.destroyById(id));
});
router.get("/activePayment/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new PaymentService(req, res);
    _service.handle(_service.getPaymentActiveByUser(id));
});
router.post("/pay", (req, res) => {
    let _service = new PaymentService(req, res);
    _service.handle(_service.performPayment(req.body));
});

module.exports = router;