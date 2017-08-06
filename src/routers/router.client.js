var router = require("express").Router();
var ClientService = require("../app/services").ClientService;

router.post("/", (req, res) => {
    let _service = new ClientService(req, res);
    _service.handle(_service.create(req.body));
});
router.post("/getAll", (req, res) => {
    let _service = new ClientService(req, res);
    _service.handle(_service.getAll(req.body));
});
router.get("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new ClientService(req, res);
    _service.handle(_service.getById(id));
});

module.exports = router;