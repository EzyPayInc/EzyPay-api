"use strict";
const config = require("../config");
var policies = require("../policies");
var oauth2orize = require("oauth2orize");
var oauth2Server = oauth2orize.createServer();
var modelLoader = require("./model.loader");

class Oauth2Service {
	static config() {
		var Models = modelLoader.getInstance()._models;
		oauth2Server.exchange(oauth2orize.exchange.password((client, username, password, scopes, callback) => {
			Models.User.findOne({ where: { email: username } }).then((user) => {
				if (!user) {
					return callback(null, false);
				}
				if (scopes) {
					Models.UserCredential.verify(
						user.id,
						password,
						scopes[0]
					).then(credential => {
						if (!credential) {
							return callback(null, false);
						}
						this.returnToken(client, user, callback);
					});
				} else {
					user.verifyPassword(password).then((isEqual) => {
						if (!isEqual) {
							return callback(null, false);
						}
						this.returnToken(client, user, callback);
					}, (error) => callback(error));
				}
			});
		}));
	}

	static verifyCredential(client, data, callback) {
		if (!data || !data.credentials) {
			return callback(new Error('Invalid credentials'));
		}
		var Models = modelLoader.getInstance()._models;
		Models.User.findOne({ where: { email: data.email } }).then((user) => {
			if (!user) {
				return callback(null, {});
			}
			Models.UserCredential.verify(
				user.id,
				data.credentials.credential,
				data.credentials.platform
			).then(credential => {
				this.returnToken(client, user, callback);
				if (!credential) {
					data.credentials.userId = user.id;
					Models.UserCredential.create(data.credentials);
				}
			}, (error) => callback(error));
		});
	}

	static returnToken(_client, _user, callback) {
		var token = {
			clientId: _client.id,
			userId: _user.id,
			value: this.buildUid(64)
		};
		var Models = modelLoader.getInstance()._models;
		Models.Token.create(token).then(
			() => callback(null, token),
			(error) => callback(error)
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