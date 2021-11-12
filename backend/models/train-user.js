export default (sequelize, DataTypes) => {

	const TrainUser = sequelize.define('TrainUser', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		trainId: { type: DataTypes.INTEGER, allowNull: false },
		userId: { type: DataTypes.INTEGER, allowNull: false },
  }, 
  {
    paranoid: true,
    tableName: 'train_users',
  });

  TrainUser.associate = function(models) {
    models.TrainUser.belongsTo(models.User);
    models.TrainUser.belongsTo(models.Train);
  }

  return TrainUser;
};