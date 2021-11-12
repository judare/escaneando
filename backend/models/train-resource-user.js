export default (sequelize, DataTypes) => {

	const TrainUserResource = sequelize.define('TrainUserResource', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		trainResourceId: { type: DataTypes.INTEGER, allowNull: true },
		userId: { type: DataTypes.INTEGER, allowNull: false },
		viewedAt: { type: DataTypes.DATE, allowNull: false },
		lastView: { type: DataTypes.DATE, allowNull: false },
  }, 
  {
    paranoid: true,
    tableName: 'train_user_resources',
  });

  TrainUserResource.associate = function(models) {
    models.TrainUserResource.belongsTo(models.User);
    models.TrainUserResource.belongsTo(models.TrainResource);
  }

  TrainUserResource.markUser = async function(user, resource) {
    let queryBuilder = {
      where: {
        userId: user.id,
        trainResourceId: resource.id
      }
    }
    let resourceUser = await TrainUserResource.findOne(queryBuilder);

    if (resourceUser) {
      resourceUser = await resourceUser.update({
        lastView: Date.now()
      });
    } else {
      resourceUser = await TrainUserResource.create({
        userId: user.id,
        trainResourceId: resource.id,
        lastView: Date.now(),
        viewedAt: Date.now(),
      });
    }
    
    return resourceUser;
  }

  return TrainUserResource;
};