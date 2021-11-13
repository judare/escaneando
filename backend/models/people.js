export default (sequelize, DataTypes) => {

	const People = sequelize.define('People', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
    cellphone: { type: DataTypes.STRING, allowNull: true },
    countryId: { type: DataTypes.INTEGER, allowNull: true },
  }, 
  {
    paranoid: true,
    tableName: 'people',
  });

  People.associate = function(models) {
    models.People.belongsTo(models.Country);
  };
  
  return People;
};