"use strict";
var request = require('request');
class HttpService {

    postRequest(options) {
        return new Promise((resolve, reject) => {
            request(options, function (error, response, body){
                if(!error && (response.statusCode >= 200 && response.statusCode <= 204)) {
                    resolve(body);
                } else{
                    var errorToSend = error == null ? body : error;
                    reject(errorToSend);
                }
            });
        });
    }
}
module.exports = HttpService;