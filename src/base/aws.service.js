"use strict";
const BaseService = require("./base.service");
const config = require('../config');
const AWS = require('aws-sdk');
class AWSService extends BaseService.Service {
	constructor(req, res) {
		super(req, res);
		AWS.config = new AWS.Config();
		AWS.config.region = config.aws.region;
		AWS.config.accessKeyId = config.aws.accessKeyId;
		AWS.config.secretAccessKey = config.aws.secretAccessKey;
	}

	//noinspection JSUnusedGlobalSymbols
	uploadFileToS3(fileData, fileName) {
		return new Promise((resolve, reject) => {
			this.awsBucket = new AWS.S3();
			this.awsBucket.putObject({
				Key: fileName,
				Body: fileData,
				Bucket: config.aws.bucket
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