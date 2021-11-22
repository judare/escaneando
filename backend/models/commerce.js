export default (sequelize, DataTypes) => {

	const Commerce = sequelize.define('Commerce', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
		logo: { type: DataTypes.STRING, allowNull: false, defaultValue: "default.png"  },
    cellphone: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    slug: { type: DataTypes.STRING, allowNull: true },
    userId: { type: DataTypes.INTEGER, allowNull: true },
    enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    businessId: { type: DataTypes.INTEGER, allowNull: true },
    facebook: { type: DataTypes.STRING, allowNull: true },
    instagram: { type: DataTypes.STRING, allowNull: true },
  }, 
  {
    paranoid: true,
    tableName: 'commerces',
  });

  Commerce.associate = function(models) {
    models.Commerce.belongsTo(models.Business);
    models.Commerce.belongsTo(models.User);
    models.Commerce.hasMany(models.User);
  };

  Commerce.prototype.hasPermissions = function(user) {
    return (this.id == user.commerceId || (this.businessId == user.businessId && user.owner));
  }

  
  return Commerce;
};