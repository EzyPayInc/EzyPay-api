"use strict";
module.exports = (sequelize, DataTypes)=> {
	var TokenModule = sequelize.define('Token', {
		userId: {
			field: 'userId',
			type: DataTypes.INTEGER
		},
		clientId: {
			field: 'clientId',
			type: DataTypes.INTEGER
		},
		value: DataTypes.STRING
	}, {
		timestamps: false,
		freezeTableName: true,
		tableName: "tb_token"
	});
	TokenModule.removeAttribute('id');
	return TokenModule;
};