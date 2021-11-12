export default (sequelize, DataTypes) => {

	const CompanyParameter = sequelize.define('CompanyParameter', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
		value: { type: DataTypes.STRING, allowNull: false },
		companyId: { type: DataTypes.INTEGER, allowNull: false },
  }, 
  {
    paranoid: true,
    tableName: 'company_parameters',
  });

  CompanyParameter.associate = function(models) {
    models.CompanyParameter.belongsTo(models.Company);
  }

  return CompanyParameter;
};