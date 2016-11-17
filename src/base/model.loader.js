"use strict";
const fs = require("fs");
const path = require("path");
const config = require("../config");
var Sequelize = require("sequelize");

class ModelLoader {
	constructor() {
		this._dbs = {};
		this._models = {};

		if (ModelLoader._instance) {
			throw new Error("Error: Instantiation failed: Use" +
				" ModelLoader.getInstance() instead of new.");
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

	setupModels() {
		var dbs = this._dbs;
		var models = this._models;
		config.dataSources.forEach((conn, index)=> {
			var modelsFolder = config.parameters.modelsFolder;
			var dir = path.join(global.appRoot, modelsFolder, conn["name"] || "");
			var sequelize = new Sequelize(conn["database"],
				conn["username"], conn["password"], conn);
			fs.readdirSync(dir).filter((file)=> {
				return path.extname(file) == ".js";
			}).forEach((file)=> {
				var c = path.join(dir, file);
				var model = sequelize.import(c);
				models[model.name] = model;
			});
			dbs[conn["name"] || index] = sequelize;
		});
	}
}
module.exports = ModelLoader;