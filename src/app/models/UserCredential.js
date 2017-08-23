"use strict";
module.exports = (sequelize, DataTypes) => {
	const UserCredential = sequelize.define('UserCredential',
		{
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
			tableName: "tb_user_credential",
			hooks: {
				beforeCreate: (credentials, options) => {
					return new Promise((resolve, reject) => {
						credentials.platform = credentials.platform.toLowerCase();
					});
				}
			}
		});

	UserCredential.verify = function (userId, credential, platform) {
		return sequelize.query(
			`SELECT userId, credential, platform
			 FROM tb_user_credential t1
			 WHERE t1.userId = $userId
			   and t1.platform = $platform
			   and t1.credential = $credential`,
			{
				bind: {
					userId: userId,
					platform: platform,
					credential: credential
				}, type: sequelize.QueryTypes.SELECT
			});
	};

	return UserCredential;
};
