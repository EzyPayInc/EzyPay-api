module.exports = (sequelize, DataTypes)=> {
	return sequelize.define('Table', {
		id: {
			field: 'idTable',
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		restaurantId: {
			field: 'idRestaurant',
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