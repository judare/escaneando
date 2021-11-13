export default (sequelize, DataTypes) => {

	const Review = sequelize.define('Review', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		review: { type: DataTypes.STRING, allowNull: false },
    peopleId: { type: DataTypes.INTEGER, allowNull: true },
    commerceId: { type: DataTypes.INTEGER, allowNull: true },
  }, 
  {
    paranoid: true,
    tableName: 'reviews',
  });

  Review.associate = function(models) {
    models.Review.belongsTo(models.Commerce);
    models.Review.belongsTo(models.People);
  };
  
  return Review;
};