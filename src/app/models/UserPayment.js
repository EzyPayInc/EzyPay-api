"use strict";
module.exports = (sequelize, DataTypes)=> {
    return sequelize.define('UserPayment', {
        paymentId: {
            field: 'paymentId',
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        userId: {
            field: 'userId',
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        cost: DataTypes.FLOAT
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: "tb_user_payment"
    });
};
