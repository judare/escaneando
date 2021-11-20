export default (sequelize, DataTypes) => {

	const People = sequelize.define('People', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: true },
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


  People.findOrCreate = async function(cellphone) {
    let queryBuilder = {
      where: {
        cellphone
      }
    }
    let people = await People.findOne(queryBuilder);
    if (!people) {
      people = await People.create({
        cellphone
      });
    }
    return people;
  }
  
  return People;
};