"use strict";
const base_service_1 = require("./base.service");
let parameters = require('../config/parameters');
const AWS = require('aws-sdk');
class AWSService extends base_service_1.Service {
    constructor(req, res) {
        super(req, res);
        AWS.config = new AWS.Config();
        AWS.config.region = parameters.awsRegion;
        AWS.config.accessKeyId = parameters.awsAccessKeyId;
        AWS.config.secretAccessKey = parameters.awsSecretAccessKey;
    }
    uploadFileToS3(fileData, fileName) {
        return new Promise((resolve, reject) => {
            this.awsBucket = new AWS.S3();
            this.awsBucket.putObject({
                Key: fileName,
                Body: fileData,
                Bucket: parameters.awsBucket
            }, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
}
exports.AWSService = AWSService;
//# sourceMappingURL=aws.service.js.map