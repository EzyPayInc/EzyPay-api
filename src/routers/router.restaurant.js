var router = require("express").Router();
var RestaurantService = require("../app/services").RestaurantService;

router.post("/", (req, res) => {
    let _service = new RestaurantService(req, res);
    _service.handle(_service.create(req.body));
});
router.post("/getAll", (req, res) => {
    let _service = new RestaurantService(req, res);
    _service.handle(_service.getAll(req.body));
});
router.get("/:id", (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new RestaurantService(req, res);
    _service.handle(_service.getById(id));
});
router.put('/:id', (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new RestaurantService(req, res);
    _service.handle(_service.updateById(id, req.body));
});

module.exports = router;