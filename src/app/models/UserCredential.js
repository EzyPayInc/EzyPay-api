"use strict";
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('UserCredential', {
		userId: {
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		credential: {
			primaryKey: true,
			type: DataTypes.STRING,
			validate: { notEmpty: true }
		},
		platform: {
			type: DataTypes.STRING,
			validate: { notEmpty: true }
		}
	}, {
		timestamps: false,
		freezeTableName: true,
		tableName: "tb_user_credential"
	});
};
