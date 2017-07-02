"use strict";
// const config = require('../config');
const ModelLoader = require('./model.loader.js');

class Service {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.user = req.user;
        this.DBs = ModelLoader.getInstance()._dbs;
        this.Models = ModelLoader.getInstance()._models;
        if (req.header("lang") !== null) {
            //var path = util.format("../app/resources/strings_%s.js", req.header("lang"));
            var path = "../app/resources/strings_en.js";
            this.localizedStrings = require(path);
        }
    }
}
exports.Service = Service;