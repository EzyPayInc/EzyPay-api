/**
 * Created by Gustavo Quesada S on 18/12/2016.
 */
const BaseService = require("../../base/base.service");
class TicketService extends BaseService.Service {

    create(data) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.Ticket.create(data);
    }
}
module.exports = TicketService;