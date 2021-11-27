export default (sequelize, DataTypes) => {

	const Country = sequelize.define('Country', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
		prefix: { type: DataTypes.STRING, allowNull: false },
    showPayments: { type: DataTypes.TINYINT, allowNull: false },
  }, 
  {
    paranoid: true,
    tableName: 'countries',
  });
  
  return Country;
};