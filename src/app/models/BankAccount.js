"use strict";
module.exports = (sequelize, DataTypes)=> {
    return sequelize.define('BankAccount', {
        id: {
            field: 'userId',
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: DataTypes.STRING,
        accountNumber: {
            field: 'account_number',
            type: DataTypes.STRING
        },
        userIdentification: {
            field: 'user_identification',
            type: DataTypes.STRING
        },
        bank: DataTypes.STRING
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: "tb_bank_account"
    });
};