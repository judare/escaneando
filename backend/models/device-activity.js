export default (sequelize, DataTypes) => {

	const DeviceActivity = sequelize.define('DeviceActivity', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		deviceId: { type: DataTypes.INTEGER, allowNull: false },
		activityId: { type: DataTypes.INTEGER, allowNull: false },
		time: { type: DataTypes.INTEGER, allowNull: false },
		date: { type: DataTypes.DATE, allowNull: false }
  }, 
  {
    paranoid: true,
    tableName: 'device_activities',
  });

  DeviceActivity.associate = function(models) {
    models.DeviceActivity.belongsTo(models.Device);
    models.DeviceActivity.belongsTo(models.Activity);
  }

  return DeviceActivity;
};