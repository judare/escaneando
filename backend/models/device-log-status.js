export default (sequelize, DataTypes) => {

	const DeviceLogStatus = sequelize.define('DeviceLogStatus', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: true },
    color: { type: DataTypes.STRING, allowNull: true },
  }, 
  {
    paranoid: true,
    tableName: 'device_log_status',
  });

  DeviceLogStatus.ALERT_PENDING = 100;
  
  return DeviceLogStatus;
};