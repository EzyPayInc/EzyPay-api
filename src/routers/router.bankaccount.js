var express = require("express");
let c = require("../base/base.controller");
var BankAccountService = require("../app/services").BankAccountService;

var router = express.Router();

router.post("/", (req, res) => {
    let _service = new BankAccountService(req, res);
    c.handleService(res, _service.create(req.body));
});
router.put("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new BankAccountService(req, res);
    c.handleService(res, _service.updateById(id, req.body));
});
router.post("/getAll", (req, res) => {
    let _service = new BankAccountService(req, res);
    c.handleService(res, _service.getAll(req.body));
});
router.get("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new BankAccountService(req, res);
    c.handleService(res, _service.getById(id));
});

module.exports = router;
