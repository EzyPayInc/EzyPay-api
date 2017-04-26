"use strict";
const config = require('../config');
let formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var util = require('util');
const ModelLoader = require("./model.loader.js");
class Service {

    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.user = req.user;
        //noinspection JSUnusedGlobalSymbols
        this.DBs = ModelLoader.getInstance()._dbs;
        this.Models = ModelLoader.getInstance()._models;
        if (req.header("lang") !== null) {
            //var path = util.format("../app/resources/strings_%s.js", req.header("lang"));
            var path = "../app/resources/strings_en.js";
            this.localizedStrings = require(path);
        }
    }

    //noinspection JSUnusedGlobalSymbols
    upload(multiple) {
        var form = new formidable.IncomingForm();
        form.uploadDir = path.join(__dirname, '../../uploads');
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

    getFile(filename) {
        var fullFilename = path.join(__dirname, ('../../uploads/' + filename));
        if (!fs.existsSync(fullFilename)) {
            return null;
        }
        var file = fs.readFileSync(fullFilename);
        return file;

    }
}
exports.Service = Service;