"use strict";
const BaseService = require("../../base/base.service");
const CredomaticPaymentGateway = require("./service.credomaticpaymentgateway");
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

    getPaymentActiveByUser(id) {
        return new Promise((resolve, reject) => {
            this.DBs[0].query('CALL sp_getPaymentActive('+id+');').then(
                (result)=> {
                    if(result.length > 0) {
                        resolve(JSON.parse(result[0].Payment));
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

    testPayment() {
        var card = {
            number : '5431111111111111',
            expirationDate : '1220',
            cvv : '123'
        };
        var paymentGateway = new CredomaticPaymentGateway(this.req, this. res);
        return paymentGateway.transaction(card, 100);
    }
}
module.exports = PaymentService;
