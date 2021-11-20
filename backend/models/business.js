export default (sequelize, DataTypes) => {

	const Business = sequelize.define('Business', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
    meta: {
      type: DataTypes.TEXT,
      get() {
        const json = this.getDataValue("meta");
        return JSON.parse(json || "{}");
      },
      set(value) {
        this.setDataValue("meta", JSON.stringify(value));
      },
    },
    email: { type: DataTypes.STRING, allowNull: true },
    nit: { type: DataTypes.STRING, allowNull: true },
    balance: { type: DataTypes.DECIMAL, allowNull: true },
    userId: { type: DataTypes.INTEGER, allowNull: true },
  }, 
  {
    paranoid: true,
    tableName: 'businesses',
  });

  Business.associate = function(models) {
    models.Business.hasMany(models.Commerce);
  };
  
  return Business;
};