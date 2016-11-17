"use strict";
const util = require("util");
const express = require("express");
const config = require("./config");
const ROUTERS = require("./routers");

class AppRouter {
	static config(router) {
		router.use((req, res, next) => {
			if (config.http.logRequest) {
				util.log(util.format("Request to: %s:%s -- Params:%s",
					req.url, req.method, JSON.stringify(req.body)));
			}
			var origin = config.http.allowOrigin || req.header("Origin");
			res.header("Access-Control-Allow-Origin", origin);
			res.header("Access-Control-Allow-Methods", config.http.allowMethods);
			res.header("Access-Control-Allow-Headers", config.http.allowHeaders);
			res.header("Access-Control-Allow-Credentials", config.http.allowCredentials);
			if ('OPTIONS' == req.method) {
				res.sendStatus(200);
			}
			else {
				next();
			}
		});
		router.get("/", (req, res)=> {
			//noinspection JSUnresolvedFunction
			res.send(config.http.message);
		});
		ROUTERS.use(router);
	}
}
module.exports = AppRouter;