export default (sequelize, DataTypes) => {

	const Bill = sequelize.define('Bill', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		companyId: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DOUBLE, allowNull: true },
    code: { type: DataTypes.STRING, allowNull: true },
    link: { type: DataTypes.STRING, allowNull: true },
  }, 
  {
    paranoid: true,
    tableName: 'bills',
  });

  return Bill;
};