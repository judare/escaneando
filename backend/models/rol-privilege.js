export default (sequelize, DataTypes) => {

	const RolPrivilege = sequelize.define('RolPrivilege', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		key: { type: DataTypes.STRING, allowNull: false },
		description: { type: DataTypes.STRING, allowNull: false },
  }, 
  {
    paranoid: true,
    tableName: 'rol_privileges',
  });

  return RolPrivilege;
};