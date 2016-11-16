"use strict";
const util = require("util");
const express = require("express");
const ROUTERS = require("../routers");

class AppRouter {
	static config(router) {
		router.use((req, res, next) => {
			util.log(util.format("Request to: %s:%s -- Params:%s", req.url, req.method, JSON.stringify(req.body)));
			//noinspection JSUnresolvedFunction
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
		router.get("/", (req, res)=> {
			res.send("EzyPay platform is online");
		});
		ROUTERS.use(router);
	}
}
exports.AppRouter = AppRouter;