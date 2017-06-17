//noinspection SpellCheckingInspection
var path = require('path');
module.exports = {
    session: {
        resave: true,
        name: "connect.ezypayid",
        saveUninitialized: true,
        secret: 'f134ec88b47384b00060e72c06cd2012'
    },
    dataSources: [{
        port: 3306,
        dialect: 'mysql',
        database: 'main',
        host: '104.198.26.242',
        username: 'root',
        password: 'R*6xVFwxpR763#WM7H',
        pool: {
            min: 0,
            max: 5,
            idle: 10000
        }
    }],
    parameters: {
        port: "3000",
        cryptoRounds: 10,
        uploadFolder: "temporal",
        modelsFolder: "/app/models",
        uidChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    },
    http: {
        message: "EzyPay platform is online",
        logRequest: true,
        allowCredentials: true,
        allowOrigin: undefined,
        allowMethods: "GET,POST,PUT,HEAD,DELETE,OPTIONS",
        allowHeaders: "Origin, X-Requested-With, Content-Type, Accept"
    },
    paymentConfig: {
        userConfig: {
            username:'jcappa101',
            publicKey:'77996421',
            privateKey:'J3tcrfhPmCOmCBq3YDPvYwwZtSlZdqmf'
        },
        type: 'auth',
        serviceConfig: {
            hostname: 'paycom.credomatic.com',
            port: 443,
            path: '/PayComBackEndWeb/common/requestPaycomService.go',
            method: 'POST',
            Content_Type: 'application/x-www-form-urlencoded'
        }

    },
    pushNotifications: {
        apn: {
            cert: path.join(__dirname, "/certificates/cert.pem"),
            key: path.join(__dirname, "/certificates/key.pem")
        }
    },
    pushNotificationsCategories: {
        callWaiter: "1",
        requestBill: "2",
        sendBill:  "3",
        splitRequest: "4",
        splitResponse: "5"
    }
};