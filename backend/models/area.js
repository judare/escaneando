export default (sequelize, DataTypes) => {

	const Area = sequelize.define('Area', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: true },
    companyId: { type: DataTypes.INTEGER, allowNull: true }
  }, 
  {
    paranoid: true,
    tableName: 'areas',
  });

  Area.associate = function(models) {
    models.Area.belongsTo(models.Company);
    models.Area.hasMany(models.User);
  }

  return Area;
};