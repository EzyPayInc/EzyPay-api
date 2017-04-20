const BaseService = require("../../base/base.service");
const PushNotifications = new require('node-pushnotifications');
const config = require('../../config');
var fs = require('fs');
var path = require('path');
class PushNotificationsService extends BaseService.Service {

    sendNotification() {
        var settings = {
            apn : {
                cert: path.join(__dirname, "../certificates/certDevelopment.pem"),
                key: path.join(__dirname, "../certificates/keyDevelopment.pem")
            }
        };
        var push = new PushNotifications(settings);
        var registrationIds = ["fc62371304adfbc6603105be2b05664ba2b744e72d991e6a128fc926552578f7",
            "01550626e3fe36924f7364dd35bf2b683e50b18859547f4bebbf00d80879129d"];

        var data = {
            title: 'EZYPAY Notifications', // REQUIRED
            body: 'This is a test', // REQUIRED
            priority: 'high', // gcm, apn. Supported values are 'high' or 'normal' (gcm). Will be translated to 10 and 5 for apn. Defaults to 'high'
            sound: 'ping.aiff', // gcm, apn
        };

        push.send(registrationIds, data, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
    }
}
module.exports = PushNotificationsService;