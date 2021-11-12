export default (sequelize, DataTypes) => {

	const BillPayment = sequelize.define('BillPayment', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		billId: { type: DataTypes.INTEGER, allowNull: false },
		userId: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DOUBLE, allowNull: true },
    payMethod: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
  }, 
  {
    paranoid: true,
    tableName: 'bill_payments',
  });

  BillPayment.associate = function(models) {
    models.BillPayment.belongsTo(models.Bill);
  }

  return BillPayment;
};