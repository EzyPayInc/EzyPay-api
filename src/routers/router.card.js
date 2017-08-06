var express = require("express");
let c = require("../base/base.controller");
var CardService = require("../app/services").CardService;

var router = express.Router();

router.post("/", (req, res) => {
    let _service = new CardService(req, res);
    c.handleService(res, _service.create(req.body));
});
router.put("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new CardService(req, res);
    c.handleService(res, _service.updateById(id, req.body));
});
router.post("/getAll", (req, res) => {
    let criteria = { "userId": 0 };
    let _service = new CardService(req, res);
    c.handleService(res, _service.getAll(criteria));
});
router.get("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new CardService(req, res);
    c.handleService(res, _service.getById(id));
});
router.delete("/:id/customer/:customer", (req, res) => {
    let id = parseInt(req.params["id"]);
    let customer = parseInt(req.params["customer"]);
    let _service = new CardService(req, res);
    c.handleService(res, _service.destroy(id, customer));
});

module.exports = router;