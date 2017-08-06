var express = require("express");
let c = require("../base/base.controller");
var DeviceTokenService = require("../app/services").DeviceTokenService;

var router = express.Router();

router.post("/", (req, res) => {
    let _service = new DeviceTokenService(req, res);
    c.handleService(res, _service.insert(req.body));
});
router.put("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new DeviceTokenService(req, res);
    c.handleService(res, _service.updateById(id, req.body));
});
router.post("/getAll", (req, res) => {
    let _service = new DeviceTokenService(req, res);
    c.handleService(res, _service.getAll(req.body));
});
router.get("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new DeviceTokenService(req, res);
    c.handleService(res, _service.getById(id));
});
router.delete("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new DeviceTokenService(req, res);
    c.handleService(res, _service.destroy(id));
});
router.delete("/", (req, res) => {
    let _service = new DeviceTokenService(req, res);
    c.handleService(res, _service.destroyAll(req.body));
});

module.exports = router;