"use strict";
const mysql_loader_1 = require("./mysql.loader");
const formidable = require('formidable');
let parameters = require('../config/parameters');
class Service {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.DBs = mysql_loader_1.ModelLoader.getInstance().getDBs();
        this.Models = mysql_loader_1.ModelLoader.getInstance().getModels();
    }
    user() {
        return this.req.user;
    }
    upload(multiple) {
        var form = new formidable.IncomingForm();
        form.uploadDir = parameters.uploadFolder;
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