export default (sequelize, DataTypes) => {

	const Rol = sequelize.define('Rol', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
		companyId: { type: DataTypes.INTEGER, allowNull: false },
  }, 
  {
    paranoid: true,
    tableName: 'rols',
  });

  Rol.associate = function(models) {
    models.Rol.belongsTo(models.Company);
    models.Rol.hasMany(models.RolPermission);
  }

  return Rol;
};