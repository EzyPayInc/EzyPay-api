const BaseService = require("../../base/base.service");
const PushNotifications = new require('node-pushnotifications');
const DeviceTokenService = require("./service.devicetoken");
const configPush = require('../../config').pushNotifications;
const pushCategories = require('../../config').pushNotificationsCategories;
var util = require('util');
class PushNotificationsService extends BaseService.Service {

    callWaiterNotification(tableNumber, commerceId, paymentId)
    {
        return new Promise((resolve, reject) => {
            let _service = new DeviceTokenService(this.req, this.res);
            let commerceCriteria = {"userID": commerceId};
            _service.getAll(commerceCriteria).then(
                (result) => {
                    let title = this.localizedStrings.callWaiterNotificationTitle;
                    let body = util.format(this.localizedStrings.callWaiterNotificationBody,
                        this.user.name, this.user.lastName, tableNumber);
                    let category = pushCategories.callWaiter;
                    let custom = {paymentId : paymentId};
                    let notification = this.createNotification(title, body, category, custom);
                    this.sendNotification(this.getDeviceTokens(result), notification)
                        .then((results) => {
                            resolve(results);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    billRequestNotification(tableNumber, commerceId, paymentId)
    {
        return new Promise((resolve, reject) => {
            let _service = new DeviceTokenService(this.req, this.res);
            let commerceCriteria = {"userID": commerceId};
            _service.getAll(commerceCriteria).then(
                (result) => {
                    let title = this.localizedStrings.billRequestNotificationTitle;
                    let body = util.format(this.localizedStrings.billRequestNotificationBody,
                        this.user.name, this.user.lastName, tableNumber);
                    let category = pushCategories.requestBill;
                    let custom = { paymentId:paymentId };
                    let notification = this.createNotification(title, body, category, custom);
                    this.sendNotification(this.getDeviceTokens(result), notification)
                        .then((results) => {
                            resolve(results);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    sendBillNotification(userId, amount, currencyCode, paymentId) {
        return new Promise((resolve, reject) => {
            let _service = new DeviceTokenService(this.req, this.res);
            let userCriteria = {"userId": userId};
            _service.getAll(userCriteria).then(
                (result) => {
                    let title = this.localizedStrings.sendBillNotificationTitle;
                    let body = util.format(this.localizedStrings.sendBillRequestNotificationBody,
                        currencyCode, amount);
                    let category = pushCategories.sendBill;
                    let custom = { paymentId : paymentId };
                    let notification = this.createNotification(title, body, category, custom);
                    this.sendNotification(this.getDeviceTokens(result), notification)
                        .then((results) => {
                            resolve(results);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    splitRequestNotification(payment, friends) {
        let title = this.localizedStrings.splitRequestNotificationTitle;
        let category = pushCategories.splitRequest;
        return new Promise((resolve, reject) => {
            for (var i = 0; i < friends.length; i++) {
                let userCriteria = {"userId": friends[i].id};
                let custom = {paymentId : payment.paymentId, userId: this.user.id, friendId: friends[i].id};
                this.createSplitRequestNotification(title, category, custom, userCriteria, payment, friends[i].cost);
            }
            resolve({success:1});
        });
    }

    createSplitRequestNotification(title, category, custom, userCriteria, payment, cost) {
        let _service = new DeviceTokenService(this.req, this.res);
        _service.getAll(userCriteria).then(
            (result) => {
                let body = util.format(this.localizedStrings.splitRequestNotificationBody,
                    this.user.name,this.user.lastName, payment.currency, cost);
                let notification = this.createNotification(title, body, category, custom);
                this.sendNotification(this.getDeviceTokens(result), notification);
            }
        );
    }

    responseSplitRequestNotification(userId, paymentId, response) {
        return new Promise((resolve, reject) => {
            let _service = new DeviceTokenService(this.req, this.res);
            let userCriteria = {"userId": userId};
            _service.getAll(userCriteria).then(
                (result) => {
                    let title = this.localizedStrings.splitResponseNotificationTitle;
                    let bodyResponse = response == 1 ? this.localizedStrings.positiveSplitResponseNotificationBody :
                        this.localizedStrings.negativeSplitResponseNotificationBody;
                    let body = util.format(bodyResponse,this.user.name, this.user.lastName);
                    let category = pushCategories.splitResponse;
                    let custom = {paymentId: paymentId};
                    let notification = this.createNotification(title, body, category, custom);
                    this.sendNotification(this.getDeviceTokens(result), notification)
                        .then((results) => {
                            resolve(results);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    createNotification(title, body, category, custom) {
        var data = {
            title: title,
            body: body,
            priority: 'high',
            sound: 'ping.aiff',
            category: category,
            custom: custom
        };

        return data;
    }

    getDeviceTokens(deviceTokens) {
        var tokens = new Array();
        for(var i = 0; i < deviceTokens.length; i++ ) {
            tokens.push(deviceTokens[i].deviceToken);
        }
        return tokens;
    }

    sendNotification(phoneIds, notification) {
        var push = new PushNotifications(configPush);
        return push.send(phoneIds, notification);
    }
}
module.exports = PushNotificationsService;