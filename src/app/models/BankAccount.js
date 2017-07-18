"use strict";
module.exports = (sequelize, DataTypes)=> {
    return sequelize.define('BankAccount', {
        userId: {
            field: 'userId',
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        userAccount: DataTypes.STRING,
        accountNumber: DataTypes.STRING,
        userIdentification:DataTypes.STRING,
        bank: DataTypes.STRING
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: "tb_bank_account"
    });
};