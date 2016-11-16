"use strict";
var bcrypt = require('bcrypt-nodejs');
class CryptoService {
	static crypt(text) {
		return new Promise((resolve, reject) => {
			//TODO: parametrizar la cantidad
			bcrypt.genSalt(10, (error, salt) => {
				if (error) {
					reject(error);
				}
				else {
					bcrypt.hash(text, salt, null, (error, hash)=> {
						if (error) {
							reject(error);
						}
						else {
							resolve(hash);
						}
					});
				}
			});
		});
	}

	static compare(data, encripted) {
		return new Promise((resolve, reject) => {
			bcrypt.compare(data, encripted, (error, isEqual) => {
				if (error) {
					reject(error);
				}
				else {
					resolve(isEqual);
				}
			});
		});
	}
}
exports.CryptoService = CryptoService;