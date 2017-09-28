"use strict";
module.exports = (sequelize, DataTypes)=> {
	return sequelize.define('Card', {
		id: {
			field: 'cardId',
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement : true
		},
		userId: {
			field: 'userId',
			type: DataTypes.INTEGER
		},
		cardNumber: DataTypes.STRING,
		ccv: DataTypes.INTEGER,
		expirationDate: DataTypes.STRING,
		serverId: DataTypes.INTEGER,
		isFavorite: DataTypes.INTEGER,
		cardVendor: DataTypes.INTEGER,		
		token : DataTypes.STRING
	}, {
		timestamps: false,
		freezeTableName: true,
		tableName: "tb_card"
	});
};