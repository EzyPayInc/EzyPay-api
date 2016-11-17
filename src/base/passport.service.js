"use strict";
var passport = require("passport");
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

var modelLoader = require("./model.loader.js");

class PassportService {
	static config(application) {
		var Models = modelLoader.getInstance()._models;
		//noinspection JSUnresolvedFunction
		passport.use(new BasicStrategy((clientKey, clientSecret, next)=> {
			process.nextTick(()=> {
				//noinspection JSUnresolvedVariable,JSUnresolvedFunction
				Models.Client.findOne({
					where: {
						id: clientKey,
						secret: clientSecret
					}
				}).then(
					(client)=> {
						if (!client) {
							next(null, false, {
								message: 'Unknown client ' + clientKey
							});
						} else {
							next(null, client);
						}
					},
					(error)=> next(error, null)
				);
			});
		}));
		//noinspection JSUnresolvedFunction
		passport.use(new BearerStrategy((accessToken, next)=> {
			process.nextTick(()=> {
				//noinspection JSUnresolvedVariable,JSUnresolvedFunction
				Models.Token.findOne({where: {value: accessToken}}).then((token)=> {
						if (!token) {
							next(null, false);
						} else {
							//noinspection JSUnresolvedVariable,JSUnresolvedFunction
							Models.User.findById(token.userId).then(
								(user)=> {
									if (!user) {
										next(null, false);
									} else {
										var result = user.toJSON();
										result["client"] = token.clientId;
										next(null, result, {scope: 'all'});
									}
								},
								(error)=> next(error, null)
							);
						}
					},
					(error)=> next(error, null)
				);
			});
		}));
		//noinspection JSUnresolvedFunction
		application.use(passport.initialize());
		application.use(passport.session());
	}
}
exports.PassportService = PassportService;