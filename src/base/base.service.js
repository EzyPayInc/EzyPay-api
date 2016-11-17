"use strict";
const config = require('../config');
let formidable = require('formidable');
const ModelLoader = require("./model.loader.js");
class Service {

	constructor(req, res) {
		this.req = req;
		this.res = res;
		this.user = req.user;
		//noinspection JSUnusedGlobalSymbols
		this.DBs = ModelLoader.getInstance()._dbs;
		this.Models = ModelLoader.getInstance()._models;
	}

	//noinspection JSUnusedGlobalSymbols
	upload(multiple) {
		var form = new formidable.IncomingForm();
		form.uploadDir = config.parameters.uploadFolder;
		form.multiples = multiple;
		let arrayFiles = [];
		return new Promise((resolve, reject) => {
			form.on('file', (field, file) => {
				arrayFiles.push(file);
			});
			form.on('error', (err) => {
				reject('error:' + err);
			});
			form.on('end', () => {
				resolve(arrayFiles);
			});
			form.parse(this.req);
		});
	}
}
exports.Service = Service;