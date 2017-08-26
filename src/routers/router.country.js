var router = require("express").Router();
var CountryService = require("../app/services").CountryService;

router.post("/getAll", (req, res) => {
    let _service = new CountryService(req, res);
    _service.handle(_service.getAll(req.body));
});

module.exports = router;