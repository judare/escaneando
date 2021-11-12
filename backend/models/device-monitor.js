function inet_ntoa(num){
  var nbuffer = new ArrayBuffer(4);
  var ndv = new DataView(nbuffer);
  ndv.setUint32(0, num);

  var a = new Array();
  for(var i = 0; i < 4; i++){
      a[i] = ndv.getUint8(i);
  }
  return a.join('.');
}

function inet_aton(ip){
  // split into octets
  var a = ip.split('.');
  var buffer = new ArrayBuffer(4);
  var dv = new DataView(buffer);
  for(var i = 0; i < 4; i++){
      dv.setUint8(i, a[i]);
  }
  return(dv.getUint32(0));
}

export default (sequelize, DataTypes) => {

	const DeviceMonitor = sequelize.define('DeviceMonitor', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		deviceId: { type: DataTypes.INTEGER, allowNull: true },
    memory: { type: DataTypes.INTEGER, allowNull: true },
    space: { type: DataTypes.INTEGER, allowNull: true },
    processor: { type: DataTypes.INTEGER, allowNull: true },
    battery: { type: DataTypes.INTEGER, allowNull: true },
    ipAddress: {
      type: DataTypes.INTEGER,
      allowNull: true,
      get () {
        return inet_ntoa(this.getDataValue('ipAddress'));
      },
      set (valueToBeSet) {
        this.setDataValue('ipAddress', inet_aton(valueToBeSet))
      }},
    disks: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        return JSON.parse(this.getDataValue('disks')) || [];
      },
      set(value) {
        this.setDataValue('disks', JSON.stringify(value));
      }
    },
    backupSize: { type: DataTypes.INTEGER, allowNull: true },
  }, 
  {
    tableName: 'device_monitor',
  });

  DeviceMonitor.associate = function(models) {
    models.DeviceMonitor.belongsTo(models.Device);
  }

  return DeviceMonitor;
};