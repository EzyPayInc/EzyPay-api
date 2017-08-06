var router = require("express").Router();
var TableService = require("../app/services").TableService;

router.post("/", (req, res) => {
    let _service = new TableService(req, res);
    _service.handle(_service.create(req.body));
});
router.post("/getAll", (req, res) => {
    let _service = new TableService(req, res);
    _service.handle(_service.getAll(req.body));
});
router.get("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new TableService(req, res);
    _service.handle(_service.getById(id));
});
router.get("/restaurant/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new TableService(req, res);
    _service.handle(_service.getByRestaurant(id));
});
router.put('/:id', (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new TableService(req, res);
    _service.handle(_service.updateById(id, req.body));
});

module.exports = router;