/**
 * Created by Gustavo Quesada S on 18/12/2016.
 */
var express = require("express");
var TicketController = require("../app/controllers").TicketController;

var router = express.Router();
//noinspection JSUnresolvedFunction
router.post("/", TicketController.create);

module.exports = router;