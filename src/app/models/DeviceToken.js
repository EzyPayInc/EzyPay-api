"use strict";
module.exports = (sequelize, DataTypes)=> {
    return sequelize.define('DeviceToken', {
        id: {
            field: 'deviceTokenId',
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement : true
        },
        userId: {
            field: 'userId',
            type: DataTypes.INTEGER
        },
        deviceToken: DataTypes.STRING,
        devicePlatform: DataTypes.STRING,
        deviceId: DataTypes.STRING
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: "tb_device_token"
    });
};
