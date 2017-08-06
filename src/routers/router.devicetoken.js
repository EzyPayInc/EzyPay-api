var router = require("express").Router();
var DeviceTokenService = require("../app/services").DeviceTokenService;

router.post("/", (req, res) => {
    let _service = new DeviceTokenService(req, res);
    _service.handle(_service.insert(req.body));
});
router.put("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new DeviceTokenService(req, res);
    _service.handle(_service.updateById(id, req.body));
});
router.post("/getAll", (req, res) => {
    let _service = new DeviceTokenService(req, res);
    _service.handle(_service.getAll(req.body));
});
router.get("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new DeviceTokenService(req, res);
    _service.handle(_service.getById(id));
});
router.delete("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new DeviceTokenService(req, res);
    _service.handle(_service.destroy(id));
});
router.delete("/", (req, res) => {
    let _service = new DeviceTokenService(req, res);
    _service.handle(_service.destroyAll(req.body));
});

module.exports = router;