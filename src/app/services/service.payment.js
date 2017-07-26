"use strict";
const BaseService = require("../../base/base.service");
const UserPaymentService = require("./service.payment");
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

    destroyById(id) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.Payment.destroy({where: {"paymentId": id}});
    }

    getPaymentActiveByUser(id) {
        return new Promise((resolve, reject) => {
            this.DBs[0].query('CALL sp_getPaymentActive('+id+');').then(
                (result)=> {
                    if(result.length > 0) {
                        resolve(result[0].Payment);
                    } else {
                        resolve(result);
                    }

                },
                (error)=> {
                    reject(error);
                }
            );
        });
    }

    performPayment(payment) {
        return new Promise((resolve,reject) => {
            var data = {
                isCanceled : 1
            };
            this.updateById(payment.id, data).then(
                (result) => resolve(result),
                (error) => resolve(error)
            )
        });
    }
}
module.exports = PaymentService;
