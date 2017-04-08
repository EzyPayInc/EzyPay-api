/**
 * Created by gustavoquesada on 4/7/17.
 */
"use strict";
module.exports = (sequelize, DataTypes)=> {
    return sequelize.define('Currency', {
        id: {
            field: 'currencyId',
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement : true
        },
        name: DataTypes.STRING,
        code: DataTypes.STRING
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: "tb_currency"
    });
};