export default (sequelize, DataTypes) => {

	const Review = sequelize.define('Review', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		review: { type: DataTypes.STRING, allowNull: true },
    personId: { type: DataTypes.INTEGER, allowNull: true },
    commerceId: { type: DataTypes.INTEGER, allowNull: true },
    product: { type: DataTypes.INTEGER, allowNull: true },
    prices: { type: DataTypes.INTEGER, allowNull: true },
    attention: { type: DataTypes.INTEGER, allowNull: true },
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