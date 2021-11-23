export default (sequelize, DataTypes) => {

	const BusinessInsight = sequelize.define('BusinessInsight', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		businessId: { type: DataTypes.INTEGER, allowNull: false },
		insightId: { type: DataTypes.INTEGER, allowNull: false },
  }, 
  {
    paranoid: true,
    tableName: 'insight_business',
  });

  BusinessInsight.associate = function(models) {
    BusinessInsight.belongsTo(models.Insight);
  }
  
  return BusinessInsight;
};