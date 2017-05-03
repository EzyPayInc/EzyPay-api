"use strict";
module.exports = (sequelize, DataTypes)=> {
    return sequelize.define('Payment', {
        id: {
            field: 'paymentId',
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement : true
        },
        commerceId: {
            field: 'commerceId',
            type: DataTypes.INTEGER
        },
        userId: DataTypes.INTEGER,
        employeeId: DataTypes.INTEGER,
        cost: DataTypes.FLOAT,
        paymentDate: DataTypes.DATE,
        tableNumber: DataTypes.INTEGER,
        isCanceled : DataTypes.INTEGER
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: "tb_payment"
    });
};