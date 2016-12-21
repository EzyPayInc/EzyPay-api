/**
 * Created by Gustavo Quesada S on 18/12/2016.
 */
"use strict";
let c = require("../../base/base.controller");
const TicketService = require("../services").TicketService;

class TicketController {
    static create(req, res) {
        let _service = new TicketService(req, res);
        c.handleService(res, _service.create(req.body));
    }
}
module.exports = TicketController;