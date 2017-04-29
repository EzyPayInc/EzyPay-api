/**
 * Created by gustavoquesada on 4/28/17.
 */
"use strict";
const BaseService = require("../../base/base.service");
class UserPaymentService extends BaseService.Service {

    create(data) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.UserPayment.create(data);
    }

    //noinspection JSUnresolvedFunction,JSUnresolvedVariable
    updateByCriteria(criteria, data) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.UserPayment.update(data, {where: criteria});
    }

    getAll(criteria) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.UserPayment.findAll({where: criteria});
    }

    addUsersToPayment(friends) {
        return new Promise((resolve, reject) => {
            for(var i = 0; i < friends.length; i++) {
                var userPayment = friends[i];
                this.create(userPayment);
            }
            resolve({"success":1});
        });
    }
}
module.exports = UserPaymentService;
