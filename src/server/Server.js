var express = require("express");
var bodyParser = require("body-parser");
var passport = require('passport');
var session = require('express-session');
import { AppRouter } from "./AppRouter";

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
        this.app.use(passport.initialize());
        this.app.use(session({
            secret: 'Super Secret Session Key',
            saveUninitialized: true,
            resave: true
        }));


    }

    routes() {
        let router;
        router = express.Router();
        AppRouter.config(router);
        this.app.use(router);
    }

    errors() {
        this.app.use(function (err, req, res, next) {
            console.error(err.stack);
            if(res.headersSent) {
                return next(err);
            }
            res.status(404);
            res.send({error: err.message});
        });
    }
}

var server = Server.bootstrap();
export default server.app;