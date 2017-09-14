"use strict";
const UserPaymentService = require("./service.payment");
const BaseService = require("../../base/base.service");
const EmailService = require("../../base/service.email");
const GreenPayService = require("./service.greenpay");
const cc = require('currency-symbol-map');
const util = require('util');
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
        var greenPayService = new GreenPayService(this.req, this.res);
        var promisesArray = [];
        return new Promise((resolve, reject) => {
            this.DBs[0].query('CALL sp_getFavoriteCards('+payment.id+');').then(
                (result) => {
                    for(var i = 0; i < result.length; i++) {
                        var promise = greenPayService.transaction(result[i]);
                        promisesArray.push(promise);
                    }
                    Promise.all(promisesArray).then(
                        (results) => { 
                            this.updatePayment(payment).then(
                                (resultUpdate) => resolve(resultUpdate),
                                (error) => reject(error)
                            )
                        },
                        (error) =>  reject(error)
                    );
                    this.sendBillNotifications(payment);
                    this.sendCommerceBillNotification(payment);
                },
                (error) => reject(error)
            )
        });
    }
    
    updatePayment(payment) {
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

    sendBillNotifications(payment) {
        this.DBs[0].query('CALL sp_getPaymentInfo('+payment.id+');').then(
            (result) => {
                for(var i = 0; i < result.length; i++) {
                    let payment = result[i];
                    let currency = cc(payment.code);
                    let emailBody =  util.format(this.localizedStrings.emailBillBody, payment.name, payment.lastname,
                    payment.restaurant, currency, payment.cost, payment.cardNumber);
                    var email = {
                        email : payment.email,
                        subject : "Ugwo Payment",
                        body : emailBody
                    };
                    let emailService = new EmailService();
                    emailService.sendEmail(email);
                }
            }
        );
    }

    sendCommerceBillNotification(payment) {
        this.DBs[0].query('CALL sp_getCommercePaymentInfo('+payment.id+');').then(
            (result) => {
                for(var i = 0; i < result.length; i++) {
                    let payment = result[i];
                    let currency = cc(payment.code);
                    var emailBody = "";
                    if(payment.eName != null){
                        emailBody =  util.format(this.localizedStrings.emailCommerceBillBody, payment.commerce, payment.name, 
                            payment.lastname,payment.paymentDate, currency, payment.cost, payment.tableNumber,
                            payment.eName, payment.eLastname);
                    } else {
                        emailBody =  util.format(this.localizedStrings.emailCommerceBillNoEmployeeBody, payment.commerce, 
                            payment.name, payment.lastname,payment.paymentDate, currency, payment.cost, payment.tableNumber);
                    }
                    var email = {
                        email : payment.email,
                        subject : "Ugwo Payment",
                        body : emailBody
                    };
                    let emailService = new EmailService();
                    emailService.sendEmail(email);
                }
            }
        );
    }
}
module.exports = PaymentService;
