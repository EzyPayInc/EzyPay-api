"use strict";
const BaseService = require("../../base/base.service");
class DeviceTokenService extends BaseService.Service {

    create(data) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.DeviceToken.create(data);
    }

    updateById(id, data) {
        return this.Models.DeviceToken.update(data, {where: {"deviceTokenId": id}});
    }

    getAll(criteria) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.DeviceToken.findAll({where: criteria});
    }

    getById(id) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.DeviceToken.findById(id);
    }
}
module.exports = DeviceTokenService;
