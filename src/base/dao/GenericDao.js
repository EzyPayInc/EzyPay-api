"use strict";
var util = require("util");
const DalReader_1 = require('./DalReader');
const ModelLoader = require("../model.loader.js");
class GenericDao {
	constructor(file, schema) {
		this.file = file;
		this.schema = schema;
		//noinspection SpellCheckingInspection
		this.file = util.format("dals/%s.xml", file);
	}

	//noinspection JSUnusedGlobalSymbols
	execRaw(operationId, data, connection) {
		return this.executeStatement(operationId, data, connection, 'RAW');
	}

	//noinspection JSUnusedGlobalSymbols
	getList(operationId, data, connection) {
		return this.executeStatement(operationId, data, connection, 'SELECT');
	}

	executeStatement(operationId, data, connection, statementType) {
		let _class = this;
		var reader = new DalReader_1.DalReader();
		return new Promise((resolve, reject) => {
			let dbs = ModelLoader.getInstance()._dbs;
			reader.readOperation(_class.file, _class.schema, operationId).then((op) => {
				let params = op.getSqlParameters();
				let sequelize = dbs[connection || "default"];
				if (sequelize) {
					sequelize.query(op.getSql(), {
						type: statementType,
						bind: GenericDao.buildParams(params, data)
					}).then((result)=> {
						console.log(util.format("Operation [%s]%s executed."
							, _class.schema, operationId));
						resolve(result);
					});
				}
				else {
					throw new Error(util.format("Connection %s not available.", connection));
				}
			}).catch((error) => {
				console.error(error);
				reject(error);
			});
		});
	}

	static buildParams(opParams, params) {
		let resultParameters = {};
		if (params) {
			for (var i = 0; i < opParams.size(); i++) {
				let id = opParams.get(i).value.getId();
				resultParameters[id] = params.get(id);
			}
		}
		return resultParameters;
	}
}
exports.GenericDao = GenericDao;