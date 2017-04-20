"use strict";
const BaseService = require("../../base/base.service");
class PaymentService extends BaseService.Service {

    create(data) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.Payment.create(data);
    }

    getAll(criteria) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.Payment.findAll({where: criteria});
    }

    getById(id) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.Payment.findById(id);
    }

    updateById(id, data) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.Payment.update(data, {where: {"id": id}});
    }
}
module.exports = PaymentService;
