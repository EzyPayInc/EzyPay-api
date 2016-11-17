var config = require("./config");
var express = require("express");
var bodyParser = require("body-parser");
var session = require('express-session');
var appRouter01 = require("./router");
var oauth2Service = require("./base/oauth2.service").Oauth2Service;
var passportService = require("./base/passport.service").PassportService;

class Server {

	static bootstrap() {
		return new Server();
	}

	constructor() {
		this.app = express();
		this.config();
		this.routes();
		this.errors();
	}

	config() {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({
			extended: true
		}));
		this.app.use(session(config.session));
		passportService.config(this.app);
		oauth2Service.config();
	}

	routes() {
		let router = express.Router();
		appRouter01.config(router);
		this.app.use(router);
	}

	errors() {
		this.app.use(function (err, req, res, next) {
			console.error(err.stack);
			if (res.headersSent) {
				return next(err);
			}
			res.status(404);
			res.send({error: err.message});
		});
	}
}
var server = Server.bootstrap();
exports.default = server.app;