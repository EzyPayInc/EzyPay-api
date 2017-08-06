var express = require("express");
let c = require("../base/base.controller");
var TicketService = require("../app/services").TicketService;

var router = express.Router();

router.post("/", (req, res) => {
    let _service = new TicketService(req, res);
    c.handleService(res, _service.create(req.body));
});

module.exports = router;