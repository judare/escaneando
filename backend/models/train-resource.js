export default (sequelize, DataTypes) => {

	const TrainResource = sequelize.define('TrainResource', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		trainId: { type: DataTypes.INTEGER, allowNull: true },
		userId: { type: DataTypes.INTEGER, allowNull: false },
		type: { type: DataTypes.STRING, allowNull: false },
		content: { type: DataTypes.STRING, allowNull: false },
		name: { type: DataTypes.STRING, allowNull: false },
  }, 
  {
    paranoid: true,
    tableName: 'train_resources',
  });

  TrainResource.associate = function(models) {
    models.TrainResource.belongsTo(models.User);
    models.TrainResource.belongsTo(models.Train);
  }

  return TrainResource;
};