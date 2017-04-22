const BaseService = require("../../base/base.service");
const PushNotifications = new require('node-pushnotifications');
const DeviceTokenService = require("./service.devicetoken");
const config = require('../../config');
var fs = require('fs');
var path = require('path');
class PushNotificationsService extends BaseService.Service {

    callWaiterNotification(tableNumber, commerceId)
    {
        return new Promise((resolve, reject) => {
            let _service = new DeviceTokenService(this.req, this.res);
            let commerceCriteria = {"userID": commerceId};
            _service.getAll(commerceCriteria).then(
                (result) => {
                    let title = "Solicitud de mesero";
                    let body = "El usuario "+ this.user.name + " " + this.user.lastName +
                        " en la mesa " + tableNumber + " solicita un mesero";
                    let notification = this.createNotification(title, body);
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

    createNotification(title, body) {
        var data = {
            title: title,
            body: body,
            priority: 'high',
            sound: 'ping.aiff'
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
        var settings = {
            apn: {
                cert: path.join(__dirname, "../certificates/certDevelopment.pem"),
                key: path.join(__dirname, "../certificates/keyDevelopment.pem")
            }
        };
        var push = new PushNotifications(settings);
        return push.send(phoneIds, notification);
    }
}
module.exports = PushNotificationsService;