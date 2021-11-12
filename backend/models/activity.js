export default (sequelize, DataTypes) => {

	const Activity = sequelize.define('Activity', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: true },
    url: { type: DataTypes.STRING, allowNull: true },
    key: { type: DataTypes.STRING, allowNull: true },
    activityCategoryId: { type: DataTypes.INTEGER, allowNull: true }
  }, 
  {
    paranoid: true,
    tableName: 'activities',
  });

  Activity.associate = function(models) {
    models.Activity.belongsTo(models.ActivityCategory);
  }

  return Activity;
};