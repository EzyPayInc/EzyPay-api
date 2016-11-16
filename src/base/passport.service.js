"use strict";
var passport = require("passport");
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

var modelLoader = require("./mysql.loader").ModelLoader;

class PassportService {
	static config() {
		//noinspection JSUnresolvedFunction
		passport.use(new BasicStrategy((email, password, next)=> {
			return next(null, {id: 1, username: "Diego"});
		}));
		//noinspection JSUnresolvedFunction
		passport.use('client-basic', new BasicStrategy((clientKey, clientSecret, next)=> {
			process.nextTick(()=> {
				//noinspection JSUnresolvedVariable,JSUnresolvedFunction
				this.Models.Client.findOne({
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
				this.Models.Token.findOne({where: {value: accessToken}}).then((token)=> {
						if (!token) {
							next(null, false);
						} else {
							//noinspection JSUnresolvedVariable,JSUnresolvedFunction
							this.Models.User.findById(token.userId).then(
								(user)=> {
									if (!user) {
										next(null, false);
									} else {
										//TODO: Verificar el scope
										next(null, user, {scope: '*'});
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
		return passport.initialize();
	}
}
PassportService.Models = modelLoader.getInstance().getModels();
exports.PassportService = PassportService;