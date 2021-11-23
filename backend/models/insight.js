export default (sequelize, DataTypes) => {

	const Insight = sequelize.define('Insight', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
		weight: { type: DataTypes.INTEGER, allowNull: false },
		keyProcess: { type: DataTypes.STRING, allowNull: false }
  }, 
  {
    paranoid: true,
    tableName: 'insights',
  });

  Insight.associate = function(models) {
    Insight.hasMany(models.BusinessInsight);
  }

  Insight.register = async function(businessId, keyProcess) {
    let { BusinessInsight } = sequelize.models;

    let queryBuilder = {
      where: {
        keyProcess
      }
    }
    let insight = await Insight.findOne(queryBuilder);
    
    queryBuilder = {
      where: {
        businessId,
        insightId: insight.id,
      }
    }
    let ui = await BusinessInsight.findOne(queryBuilder);
    if (!ui) {
      ui = await BusinessInsight.create({
        businessId,
        insightId: insight.id,
      });
    }
    return ui;
  }
  
  return Insight;
};