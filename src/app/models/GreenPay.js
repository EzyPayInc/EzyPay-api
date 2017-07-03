"use strict";
module.exports = (sequelize, DataTypes)=> {
	return sequelize.define('GreenPay', {
		id: {
			field: 'greenpayId',
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		accessToken: DataTypes.STRING,
		refreshToken: DataTypes.STRING,
		tokenType : DataTypes.STRING,
		expiresIn: DataTypes.INTEGER,
        createdAt: DataTypes.DATE
	}, {
		timestamps: false,
		freezeTableName: true,
		tableName: "tb_greenpay"
	});
};