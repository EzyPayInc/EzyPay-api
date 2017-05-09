"use strict";
const BaseService = require("../../base/base.service");
var https = require('https');
class HttpService extends BaseService.Service {

    postRequest(postData, postOptions) {
        return new Promise((resolve, reject) => {
            const postReq = https.request(postOptions, (res) => {
                res.on('data', (d) => {
                    process.stdout.write(d);
                    resolve(d.toString('utf8'));
                });
            });
            postReq.on('error', (e) => {
                reject(e)
            });
            postReq.write(postData);
            postReq.end();
        });
    }
}
module.exports = HttpService;

