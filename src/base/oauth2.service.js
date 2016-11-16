"use strict";
var policies = require("../policies");
var oauth2orize = require("oauth2orize");
var oauth2Server = oauth2orize.createServer();
var modelLoader = require("./mysql.loader").ModelLoader;

class Oauth2Service {

	static config() {
		//noinspection JSCheckFunctionSignatures
		oauth2Server.exchange(oauth2orize.exchange.password(
			(client, username, password, scope, callback)=> {
				//noinspection JSUnresolvedFunction,JSUnresolvedVariable
				this.Models.User.findOne({where: {email: username}}).then((user)=> {
					if (!user) {
						callback(null, false);
					} else {
						user.verifyPassword(password).then(
							(isEqual)=> {
								if (!isEqual) {
									callback(null, false);
								} else {
									var token = {
										userId: user.id,
										clientId: client.id,
										value: this.buildUid(64)
									};
									//noinspection JSUnresolvedVariable
									this.Models.Token.create(token).then(
										()=> callback(null, token),
										(error)=> callback(error)
									);
								}
							},
							(error)=> callback(error)
						);
					}
				});
			})
		);
	}

	static buildUid(len) {
		var buffer = [];
		//noinspection SpellCheckingInspection
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (var i = 0; i < len; ++i) {
			var min = 0;
			var max = chars.length - 1;
			var random = Math.random() * (max - min + 1);
			buffer.push(chars[Math.floor(random) + min]);
		}
		return buffer.join('');
	}
}
Oauth2Service.Models = modelLoader.getInstance().getModels();
exports.Oauth2Service = Oauth2Service;

exports.TokenEndpoint = [
	policies.ClientAuth,
	oauth2Server.token(),
	oauth2Server.errorHandler()
];