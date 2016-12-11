"use strict";
module.exports = (sequelize, DataTypes)=> {
	return sequelize.define('Card', {
		id: {
			field: 'cardId',
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		userId: {
			field: 'userId',
			type: DataTypes.INTEGER
		},
		number: DataTypes.STRING,
		cvv: DataTypes.STRING,
		month: DataTypes.STRING,
		year: DataTypes.STRING
	}, {
		timestamps: false,
		freezeTableName: true,
		tableName: "tb_card"
	});
};