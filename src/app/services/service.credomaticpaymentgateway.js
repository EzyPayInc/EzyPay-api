"use strict";
const BaseService = require("../../base/base.service");
const config = require("../../config");
var timestamp = require('unix-timestamp');
var qString = require('querystring');
var md5 = require('md5');
const HttpService = require("./service.http");
class CredomaticPaymentGatewayService extends BaseService.Service {

    transaction(card, amount) {
        var dateISO = (new Date()).toISOString();//ISO 8601 date
        var time = timestamp.fromDate(dateISO);//UNIX epoc time
        var tamount = (amount).toFixed(2);//Transaction amount
        var orderId = 'orderTest';//Max 20 characters
        var postData = this.getBody(this.getHash(tamount,orderId, time), card, orderId, time, tamount);
        var postOptions = this.getServiceInfo(postData);
        var httpService = new HttpService(this.req, this.res);
        return httpService.postRequest(postData, postOptions);
    }

    getHash(tamount, orderId, time) {
        /****HASH CALCULATION****/
        var hash = md5(
            orderId + '|' +
            tamount + '|' +
            time + '|' +
            config.paymentConfig.userConfig.privateKey);
        /****HASH CALCULATION****/

        return hash;
    }

    getBody(hash, card, orderId, time, tamount) {
        /****CREDOMATIC REQUEST AUTH****/
        var postData = qString.stringify({
            username: config.paymentConfig.userConfig.username,
            type:  config.paymentConfig.type,//Constant
            key_id: config.paymentConfig.userConfig.publicKey,
            hash: hash,
            time: time,
            amount: tamount,
            orderid: orderId,
            ccnumber: card.number,
            ccexp: card.expirationDate,
            cvv: card.cvv
        });
        return postData;
    }

    getServiceInfo(postData) {
        var postOptions = {
            hostname: config.paymentConfig.serviceConfig.hostname,
            port: config.paymentConfig.serviceConfig.port,
            path: config.paymentConfig.serviceConfig.path,
            method: config.paymentConfig.serviceConfig.method,
            headers: {
                'Content-Type': config.paymentConfig.serviceConfig.Content_Type,
                'Content-Length': postData.length
            }
        };
        return postOptions;
    }
}
module.exports = CredomaticPaymentGatewayService;
