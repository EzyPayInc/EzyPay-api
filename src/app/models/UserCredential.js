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
			tableName: "tb_user_credential"
		});

	UserCredential.verify = function (username, credential, platform) {
		return sequelize.query(
			`SELECT credential, platform, email 
			 FROM tb_user_credential t1, tb_user t2
			 WHERE t1.userId = t2.userId
			   and t2.email = $username
			   and t1.platform= $platform
			   and t1.credential= $credential`,
			{
				bind: {
					username: username,
					platform: platform,
					credential: credential
				}, type: sequelize.QueryTypes.SELECT
			});
	};

	return UserCredential;
};
