module.exports = (sequelize, DataTypes)=> {
	return sequelize.define('Restaurant', {
		id: {
			field: 'idRestaurant',
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		email: {
			unique: true,
			type: DataTypes.STRING,
			validate: {notEmpty: true, isEmail: true}
		},
		password: {
			type: DataTypes.STRING,
			validate: {notEmpty: true, min: 8}
		},
		name: DataTypes.STRING,
		isActive: DataTypes.BOOLEAN
	}, {
		timestamps: false,
		freezeTableName: true,
		tableName: "tb_restaurant"
	});
};