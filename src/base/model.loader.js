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
		let c_name = process.env.INSTANCE_CONNECTION_NAME;
		if (process.env.NODE_ENV === 'production' && c_name) {
			if (config.dataSource.dialect === 'mysql') {
				config.dataSource.dialectOptions = {
					socketPath: `/cloudsql/${c_name}`
				}
			}
		}
		var modelsFolder = config.parameters.modelsFolder;
		var dir = path.join(global.appRoot, modelsFolder);
		var sequelize = new Sequelize(
			config.dataSource.database,
			config.dataSource.username,
			config.dataSource.password,
			config.dataSource);
		fs.readdirSync(dir).filter((file) => {
			return path.extname(file) == ".js";
		}).forEach((file) => {
			var c = path.join(dir, file);
			var model = sequelize.import(c);
			models[model.name] = model;
		});
		dbs[0] = sequelize;
	}
}
module.exports = ModelLoader;