export default (sequelize, DataTypes) => {

	const Train = sequelize.define('Train', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		userId: { type: DataTypes.INTEGER, allowNull: false },
		companyId: { type: DataTypes.INTEGER, allowNull: false },
		name: { type: DataTypes.STRING, allowNull: false },
		expiresAt: { type: DataTypes.DATE, allowNull: true },
  }, 
  {
    paranoid: true,
    tableName: 'train',
  });

  Train.associate = function(models) {
    models.Train.belongsTo(models.Company);
    models.Train.belongsTo(models.User);
    models.Train.hasMany(models.TrainResource);
    models.Train.hasMany(models.TrainUser);
  }


  return Train;
};