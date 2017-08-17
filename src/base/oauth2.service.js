"use strict";
const config = require("../config");
var policies = require("../policies");
var oauth2orize = require("oauth2orize");
var oauth2Server = oauth2orize.createServer();
var modelLoader = require("./model.loader");

class Oauth2Service {
	static config() {
		var Models = modelLoader.getInstance()._models;
		oauth2Server.exchange(oauth2orize.exchange.password(
			(client, username, password, scopes, callback) => {
				var returnToken = (_user) => {
					var token = {
						userId: _user.id,
						clientId: client.id,
						value: this.buildUid(64)
					};
					Models.Token.create(token).then(
						() => callback(null, token),
						(error) => callback(error)
					);
				};
				Models.User.findOne({ where: { email: username } }).then((user) => {
					if (!user) {
						callback(null, false);
					} else {
						if (scopes) {
							scopes.forEach(scope => {
								Models.UserCredential.verify(username, password, scope)
									.then(credential => {
										returnToken(user);
									}, (error) => callback(error));
							});
						} else {
							user.verifyPassword(password).then((isEqual) => {
								if (!isEqual) {
									callback(null, false);
								} else {
									returnToken(user);
								}
							}, (error) => callback(error));
						}
					}
				});
			})
		);
	}

	static buildUid(len) {
		var buffer = [];
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