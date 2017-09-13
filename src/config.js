var multer = require('multer');
var path = require('path');
module.exports = {
    session: {
        resave: true,
        name: "connect.ezypayid",
        saveUninitialized: true,
        secret: 'f134ec88b47384b00060e72c06cd2012'
    },
    dataSource: {
        dialect: 'mysql',
        database: 'ugwo_main',
        username: 'root',
        password: 'R*6xVFwxpR763#WM7H',
        pool: {
            min: 0,
            max: 5,
            idle: 10000
        }
    },
    parameters: {
        cryptoRounds: 10,
        modelsFolder: "/app/models",
        cloud_project: "ugwo-platform",
        cloud_bucket: "ugwo-contact-pictures",
        cloud_file_url: (file) => {
            let bucket = 'ugwo-contact-pictures';
            return `https://storage.googleapis.com/${bucket}/${file}`;
        },
        uidChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    },
    http: {
        port: 8080,
        message: "EzyPay platform is online",
        logRequest: true,
        allowCredentials: true,
        allowOrigin: undefined,
        allowMethods: "GET,POST,PUT,HEAD,DELETE,OPTIONS",
        allowHeaders: "Origin, X-Requested-With, Content-Type, Accept"
    },
    multer: multer({
        storage: multer.MemoryStorage,
        limits: {
            fileSize: 5 * 1024 * 1024 // no larger than 5mb
        }
    }),
    httpMethods: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
    },
    greenPayConfig: {
        hostname: 'https://sandbox.greenpay.me',
        login: {
            username: 'easypay',
            password: 'easypay7'
        },
        paths: {
            login: '/login',
            customers: '/customers',
            creditCards: '/customers/%d/creditCards/',
            transactions: '/transactions'
        }
    },
    smtpConfig: {
        host: 'smtp.gmail.com',
		port: 465,
		secure: true, // use SSL
		auth: {
			user: 'quesada.tavo@gmail.com',
			pass: 'samuel.642009'
		}
    },
    pushNotifications: {
        apn: {
            token: {
                key: path.join(__dirname, "/certificates/key.p8"),
                keyId: '9P35VFNHTB',
                teamId: 'NEY65554FF',
            },
            /*cert: path.join(__dirname, "/certificates/cert.pem"),
            key: path.join(__dirname, "/certificates/key.pem"),
            production: false*/
        }
    },
    pushNotificationsCategories: {
        callWaiter: "1",
        requestBill: "2",
        sendBill: "3",
        splitRequest: "4",
        splitResponse: "5"
    }
};