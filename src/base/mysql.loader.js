"use strict";
const fs = require("fs");
const path = require("path");
var Sequelize = require("sequelize");
var connections = require("../config/connections");
class ModelLoader {
    constructor() {
        this._dbs = {};
        this._models = {};
        if (ModelLoader._instance) {
            throw new Error("Error: Instantiation failed: Use ModelLoader.getInstance() instead of new.");
        }
        this.setupModels();
        ModelLoader._instance = this;
    }
    static getInstance() {
        if (!ModelLoader._instance) {
            this._instance = new ModelLoader();
        }
        return ModelLoader._instance;
    }
    getDBs() {
        return this._dbs;
    }
    getModels() {
        return this._models;
    }
    setupModels() {
        var dir = "src/app/models";
        var dbs = this._dbs;
        var models = this._models;
        var conn = connections.MySQL01;
        if (conn["dialect"] == "mysql") {
            var sqlz = new Sequelize(conn["database"], conn["user"], conn["password"], conn);
            fs.readdirSync(dir).filter(function (file) {
                return path.extname(file) == ".js";
            }).forEach(function (file) {
                var c = path.join("../../" + dir, file);
                var model = sqlz.import(c);
                models[model.name] = model;
            });
            dbs["MySQL01"] = sqlz;
        }
    }
}
exports.ModelLoader = ModelLoader;