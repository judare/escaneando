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
  }, 
  {
    paranoid: true,
    tableName: 'commerces',
  });

  Commerce.associate = function(models) {
    models.Commerce.belongsTo(models.User);
    models.Commerce.hasMany(models.User);
  };
  
  return Commerce;
};