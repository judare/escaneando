export default (sequelize, DataTypes) => {

	const DeviceBackup = sequelize.define('DeviceBackup', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		deviceId: { type: DataTypes.INTEGER, allowNull: false },
		size: { type: DataTypes.INTEGER, allowNull: false },
    expiresAt: { type: DataTypes.DATE, allowNull: true },
    location: { type: DataTypes.STRING, allowNull: true },
    meta: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        return JSON.parse(this.getDataValue('meta')) || [];
      },
      set(value) {
        this.setDataValue('meta', JSON.stringify(value));
      }
    },
  }, 
  {
    paranoid: true,
    tableName: 'device_backups',
  });

  DeviceBackup.associate = function(models) {
    models.DeviceBackup.belongsTo(models.Device);
  }

  return DeviceBackup;
};