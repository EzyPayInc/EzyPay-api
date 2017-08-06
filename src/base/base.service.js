"use strict";
const ModelLoader = require('./model.loader.js');
exports.Service = class Service {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.user = req.user;
        this.DBs = ModelLoader.getInstance()._dbs;
        this.Models = ModelLoader.getInstance()._models;
        if (req.header("lang") !== null) {
            var path = "../app/resources/strings_en.js";
            this.localizedStrings = require(path);
        }
    }
    handle(service) {
        service.then((result) => {
            this.res.json(result);
        }, (error) => {
            console.error(error);
            this.res.status(500).json({
                message: error.message
            });
        });
    };
}