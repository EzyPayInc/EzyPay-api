"use strict";
const config = require("../config");
var policies = require("../policies");
var oauth2orize = require("oauth2orize");
var oauth2Server = oauth2orize.createServer();
var modelLoader = require("./model.loader.js");

class Oauth2Service {
	static config() {
		var Models = modelLoader.getInstance()._models;
		//noinspection JSCheckFunctionSignatures
		oauth2Server.exchange(oauth2orize.exchange.password(
			(client, username, password, scope, callback)=> {
				//noinspection JSUnresolvedFunction,JSUnresolvedVariable
				Models.User.findOne({where: {email: username}}).then((user)=> {
					if (!user) {
						callback(null, false);
					} else {
						user.verifyPassword(password).then((isEqual)=> {
							if (!isEqual) {
								callback(null, false);
							} else {
								var token = {
									userId: user.id,
									clientId: client.id,
									value: this.buildUid(64)
								};
								//noinspection JSUnresolvedFunction,JSUnresolvedVariable
								Models.Token.create(token).then(
									()=> callback(null, token),
									(error)=> callback(error)
								);
							}
						}, (error)=> callback(error));
					}
				});
			})
		);
	}

	static buildUid(len) {
		var buffer = [];
		//noinspection SpellCheckingInspection
		var chars = config.parameters.uidChars;
		for (var i = 0; i < len; ++i) {
			var min = 0;
			var max = chars.length - 1;
			var random = Math.random() * (max - min + 1);
			buffer.push(chars[Math.floor(random) + min]);
		}
		return buffer.join('');
	}
}
module.exports = {
	Oauth2Service: Oauth2Service,
	TokenEndpoint: [
		policies.ClientAuth,
		oauth2Server.token(),
		oauth2Server.errorHandler()
	]
};