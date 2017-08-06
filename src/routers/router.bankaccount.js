var router = require("express").Router();
var BankAccountService = require("../app/services").BankAccountService;

router.post("/", (req, res) => {
    let _service = new BankAccountService(req, res);
    _service.handle(_service.create(req.body));
});
router.put("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new BankAccountService(req, res);
    _service.handle(_service.updateById(id, req.body));
});
router.post("/getAll", (req, res) => {
    let _service = new BankAccountService(req, res);
    _service.handle(_service.getAll(req.body));
});
router.get("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new BankAccountService(req, res);
    _service.handle(_service.getById(id));
});

module.exports = router;
