var express = require("express");
// var passport = require('passport');
var bodyParser = require("body-parser");
var session = require('express-session');
var appRouter = require("./app.router").AppRouter;
var oauth2Service = require("../base/oauth2.service").Oauth2Service;
var passportService = require("../base/passport.service").PassportService;

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
		this.app.use(passportService.config());
		oauth2Service.config();
		this.app.use(session({
			resave: true,
			saveUninitialized: true,
			secret: 'Super Secret Session Key'
		}));
	}

	routes() {
		let router = express.Router();
		appRouter.config(router);
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