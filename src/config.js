//noinspection SpellCheckingInspection
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
		database: 'ezypay_new',
		host: '172.16.122.12',
		username: 'ezypay01',
		password: 'EzyPay123#',
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
	}
};