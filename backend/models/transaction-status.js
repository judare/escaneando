export default (sequelize, DataTypes) => {

	const TransactionStatus = sequelize.define('TransactionStatus', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
		color: { type: DataTypes.STRING, allowNull: false }
  }, 
  {
    paranoid: true,
    tableName: 'transaction_status',
  });

  TransactionStatus.associate = function(models) {
    models.TransactionStatus.hasMany(models.Transaction);
  };
  
  return TransactionStatus;
};