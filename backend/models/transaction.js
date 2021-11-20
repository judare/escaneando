export default (sequelize, DataTypes) => {

	const Transaction = sequelize.define('Transaction', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		status: { type: DataTypes.STRING, allowNull: false },
    personId: { type: DataTypes.INTEGER, allowNull: true },
    commerceId: { type: DataTypes.INTEGER, allowNull: true },
    businessId: { type: DataTypes.INTEGER, allowNull: true },
    paymentMethodId: { type: DataTypes.INTEGER, allowNull: true },
    costs: { type: DataTypes.DECIMAL, allowNull: true },
    amount: { type: DataTypes.DECIMAL, allowNull: true },
  }, 
  {
    paranoid: true,
    tableName: 'transactions',
  });

  Transaction.associate = function(models) {
    models.Transaction.belongsTo(models.Business);
    models.Transaction.belongsTo(models.People);
    models.Transaction.belongsTo(models.Commerce);
    models.Transaction.belongsTo(models.PaymentMethod);
    models.Transaction.belongsTo(models.Business);
  };
  
  return Transaction;
};