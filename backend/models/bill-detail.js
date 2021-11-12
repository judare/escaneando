export default (sequelize, DataTypes) => {

	const BillDetail = sequelize.define('BillDetail', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		billId: { type: DataTypes.INTEGER, allowNull: false },
    key: { type: DataTypes.STRING, allowNull: true },
    value: { type: DataTypes.STRING, allowNull: true },
  }, 
  {
    paranoid: true,
    tableName: 'bill_details',
  });

  BillDetail.associate = function(models) {
    models.BillDetail.belongsTo(models.Bill);
  }

  return BillDetail;
};