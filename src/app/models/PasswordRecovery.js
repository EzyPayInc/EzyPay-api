"use strict";
module.exports = (sequelize, DataTypes)=> {
    return sequelize.define('PasswordRecovery', {
        id: {
            field: 'passwordRecoveryId',
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        userEmail: DataTypes.STRING,
        token: DataTypes.STRING
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: "tb_password_recovery"
    });
};