/**
 * Created by gustavoquesada on 10/15/16.
 */
import * as util from 'util';
import { Router, Request, Response } from "express";
import { USER_ROUTER } from "../app/routes/UserRouter";
import { SESSION_ROUTER } from "../app/routes/SessionRouter";
import { RESTAURANT_ROUTER } from "../app/routes/RestaurantRouter";
import { TABLE_ROUTER } from "../app/routes/TableRouter";
import { CLIENT_ROUTER  } from "../app/routes/ClientRouter";
import { OAUTH2_ROUTER  } from "../app/routes/Oauth2Router";

export class AppRouter {

    static config(router) {

        router.use( function (req, res, next) {
            util.log(util.format("Request to: %s:%s -- Params:%s",
                req.url, req.method, JSON.stringify(req.body)));
            // res.header("Content-Type", "application/json");
            res.setHeader('Access-Control-Allow-Credentials', "true");
            res.header("Access-Control-Allow-Origin", req.header("Origin"));
            res.header("Access-Control-Allow-Methods", "GET,POST,PUT,HEAD,DELETE,OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            if ('OPTIONS' == req.method) {
                res.sendStatus(200);
            }
            else {
                next();
            }
        });

        var APP_ROUTER = Router();

        APP_ROUTER.get("/", function (req, res) {
            res.send("EzyPay platform is online");
        });

        //publish services
        router.use("/", APP_ROUTER);
        router.use("/", SESSION_ROUTER);
        router.use("/user", USER_ROUTER);
        router.use("/restaurant", RESTAURANT_ROUTER);
        router.use("/table", TABLE_ROUTER);
        router.use("/clients", CLIENT_ROUTER);
        router.use("/oauth2", OAUTH2_ROUTER);
    }
}