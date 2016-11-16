"use strict";
module.exports = (sequelize, DataTypes)=> {
	return sequelize.define('Client', {
		id: {
			field: 'idClient',
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: DataTypes.STRING,
		secret: DataTypes.STRING
	}, {
		timestamps: false,
		freezeTableName: true,
		tableName: "tb_client"
	});
};