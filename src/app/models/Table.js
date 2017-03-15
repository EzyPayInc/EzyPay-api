module.exports = (sequelize, DataTypes)=> {
	return sequelize.define('Table', {
		id: {
			field: 'tableId',
			primaryKey: true,
			type: DataTypes.INTEGER,
            autoIncrement : true
		},
		restaurantId: {
			field: 'restaurantId',
            validate: {notEmpty: true},
			type: DataTypes.INTEGER
		},
		tableNumber: {
			type: DataTypes.INTEGER,
			validate: {notEmpty: true}
		},
		isActive: DataTypes.BOOLEAN
	}, {
		timestamps: false,
		freezeTableName: true,
		tableName: "tb_table"
	});
};