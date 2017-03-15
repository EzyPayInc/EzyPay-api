/**
 * Created by Gustavo Quesada S on 18/12/2016.
 */
"use strict";
module.exports = (sequelize, DataTypes)=> {
    return sequelize.define('Ticket', {
        id: {
            field: 'ticketId',
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement : true
        },
        restaurantId: DataTypes.INTEGER,
        tableId: DataTypes.INTEGER
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: "tb_ticket"
    });
};