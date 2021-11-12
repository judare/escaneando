export default (sequelize, DataTypes) => {

	const DeviceLog = sequelize.define('DeviceLog', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		deviceId: { type: DataTypes.INTEGER, allowNull: false },
		userId: { type: DataTypes.INTEGER, allowNull: true },
		deviceLogStatusId: { type: DataTypes.INTEGER, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
    action: { type: DataTypes.STRING, allowNull: true },
    reminderAt: { type: DataTypes.DATE, allowNull: true },
  }, 
  {
    paranoid: true,
    tableName: 'device_logs',
  });

  DeviceLog.associate = function(models) {
    models.DeviceLog.belongsTo(models.Device);
    models.DeviceLog.belongsTo(models.DeviceLogStatus);
    models.DeviceLog.belongsTo(models.User);
  }

  return DeviceLog;
};