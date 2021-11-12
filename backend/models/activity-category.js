export default (sequelize, DataTypes) => {

	const ActivityCategory = sequelize.define('ActivityCategory', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		class: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: true }
  }, 
  {
    paranoid: true,
    tableName: 'activity_categories',
  });

  return ActivityCategory;
};