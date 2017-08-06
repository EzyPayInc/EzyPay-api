var express = require("express");
let c = require("../base/base.controller");
var TableService = require("../app/services").TableService;

var router = express.Router();

router.post("/", (req, res) => {
    let _service = new TableService(req, res);
    c.handleService(res, _service.create(req.body));
});
router.post("/getAll", (req, res) => {
    let _service = new TableService(req, res);
    c.handleService(res, _service.getAll(req.body));
});
router.get("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new TableService(req, res);
    c.handleService(res, _service.getById(id));
});
router.get("/restaurant/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new TableService(req, res);
    c.handleService(res, _service.getByRestaurant(id));
});
router.put('/:id', (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new TableService(req, res);
    c.handleService(res, _service.updateById(id, req.body));
});

module.exports = router;