"use strict";
module.exports = (sequelize, DataTypes)=> {
	return sequelize.define('Country', {
		id: {
			field: 'id',
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			field: 'nicename',
			type: DataTypes.STRING
		},
		phonecode: DataTypes.INTEGER
	}, {
		timestamps: false,
		freezeTableName: true,
		tableName: "tb_country"
	});
};