import moment from "moment";

export default (sequelize, DataTypes) => {

	const Device = sequelize.define('Device', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		userId: { type: DataTypes.INTEGER, allowNull: true },
		hash: { type: DataTypes.STRING, allowNull: false },
		companyId: { type: DataTypes.INTEGER, allowNull: true },
		alerts: { type: DataTypes.INTEGER, allowNull: true },
		name: { type: DataTypes.STRING, allowNull: false },
		description: { type: DataTypes.STRING, allowNull: true },
		image: { type: DataTypes.STRING, allowNull: true },
    memory: { type: DataTypes.INTEGER, allowNull: true },
    space: { type: DataTypes.INTEGER, allowNull: true },
    os: { type: DataTypes.STRING, allowNull: true },
    cores: { type: DataTypes.INTEGER, allowNull: true },
    latitude: { type: DataTypes.INTEGER, allowNull: true },
    longitude: { type: DataTypes.INTEGER, allowNull: true },
    processor: { type: DataTypes.STRING, allowNull: true },
    battery: { type: DataTypes.STRING, allowNull: true },
    lastActivity: { type: DataTypes.DATE, allowNull: true },
    lastBackUp: { type: DataTypes.DATE, allowNull: true },
    extra: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        return JSON.parse(this.getDataValue('extra')) || {};
      },
      set(value) {
        this.setDataValue('extra', JSON.stringify(value));
      }
    },
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
    backup: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        return JSON.parse(this.getDataValue('backup')) || [];
      },
      set(value) {
        this.setDataValue('backup', JSON.stringify(value));
      }
    },
    backupSize: { type: DataTypes.INTEGER, allowNull: true },
  }, 
  {
    paranoid: true,
    tableName: 'devices',
  });

  Device.associate = function(models) {
    models.Device.belongsTo(models.User);
    models.Device.belongsTo(models.Company);
  }

  Device.prototype.isActive = function() {
    return moment().subtract(5, "minutes").isBefore(this.lastActivity);
  }

  Device.prototype.log = async function(action, user, description, reminderAt = null) {
    let db = sequelize.models;

    let data = {
      description,
      deviceId: this.id,
      userId: user.id,
      action,
      reminderAt
    };
    await db.DeviceLog.create(data);
  }


  Device.prototype.parameters = async function() {

    let fields = this.extra.Parameters;

    let company = await this.getCompany();

    let parameters = await company.parameters();

    parameters = parameters.map(p => {
      p.content  = fields ? fields[p.name] : null;
      return p;
    });

    return parameters;
  }


  


 

  return Device;
};