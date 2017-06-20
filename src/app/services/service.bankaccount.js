"use strict";
const BaseService = require("../../base/base.service");
class BankAccountService extends BaseService.Service {

    create(data) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.BankAccount.create(data);
    }

    updateById(id, data) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.BankAccount.update(data, {where: {"userId": id}});
    }

    getAll(criteria) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.BankAccount.findAll({where: criteria});
    }

    getById(id) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.BankAccount.findById(id);
    }
}
module.exports = BankAccountService;
