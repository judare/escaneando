export default (sequelize, DataTypes) => {

	const RolPermission = sequelize.define('RolPermission', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		rolPrivilegeId: { type: DataTypes.INTEGER, allowNull: false },
		rolId: { type: DataTypes.INTEGER, allowNull: false },
  }, 
  {
    paranoid: true,
    tableName: 'rol_permissions',
  });

  RolPermission.associate = function(models) {
    models.RolPermission.belongsTo(models.Rol);
    models.RolPermission.belongsTo(models.RolPrivilege);
  }

  return RolPermission;
};