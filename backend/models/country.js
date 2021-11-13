export default (sequelize, DataTypes) => {

	const Country = sequelize.define('Country', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false }
  }, 
  {
    paranoid: true,
    tableName: 'countries',
  });
  
  return Country;
};