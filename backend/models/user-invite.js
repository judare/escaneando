export default (sequelize, DataTypes) => {

	const UserInvite = sequelize.define('UserInvite', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false,
      set(value) {
        this.setDataValue('code', Math.random().toString("36").slice(-10));
        this.setDataValue('userId', value);
      }
    },
		companyId: { type: DataTypes.INTEGER, allowNull: false },
		email: { type: DataTypes.STRING, allowNull: false },
    code: {
      type: DataTypes.STRING,
    },
		expiresAt: { type: DataTypes.DATE, allowNull: false}
  }, 
  {
    paranoid: true,
    tableName: 'user_invites',
  });

  UserInvite.associate = function(models) {
    models.UserInvite.belongsTo(models.User);
    models.UserInvite.belongsTo(models.Company);
  }

  UserInvite.search = function(id, code){
    return UserInvite.findOne({
      where: {
        id,
        code
      }
    })
  }

  return UserInvite;
};