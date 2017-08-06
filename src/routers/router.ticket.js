var router = require("express").Router();
var TicketService = require("../app/services").TicketService;

router.post("/", (req, res) => {
    let _service = new TicketService(req, res);
    _service.handle(_service.create(req.body));
});

module.exports = router;