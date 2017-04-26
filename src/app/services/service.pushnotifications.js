const BaseService = require("../../base/base.service");
const PushNotifications = new require('node-pushnotifications');
const DeviceTokenService = require("./service.devicetoken");
const configPush = require('../../config').pushNotifications;
const pushCategories = require('../../config').pushNotificationsCategories;
var util = require('util');
class PushNotificationsService extends BaseService.Service {

    callWaiterNotification(tableNumber, commerceId)
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
                    let notification = this.createNotification(title, body, category, null);
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

    billRequestNotification(tableNumber, commerceId)
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
                    let custom = {tableNumber : tableNumber, clientId : this.user.id};
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

    sendBillNotification(userId, amount, currencyCode) {
        return new Promise((resolve, reject) => {
            let _service = new DeviceTokenService(this.req, this.res);
            let userCriteria = {"userId": userId};
            _service.getAll(userCriteria).then(
                (result) => {
                    let title = this.localizedStrings.sendBillNotificationTitle;
                    let body = util.format(this.localizedStrings.sendBillRequestNotificationBody,
                        currencyCode, amount);
                    let category = pushCategories.sendBill;
                    let custom = {amount : amount, currencyCode : currencyCode};
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