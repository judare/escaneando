export default (sequelize, DataTypes) => {

	const Company = sequelize.define('Company', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		code: { type: DataTypes.STRING, allowNull: false },
		name: { type: DataTypes.STRING, allowNull: false },
		image: { type: DataTypes.STRING, allowNull: false },
  }, 
  {
    paranoid: true,
    tableName: 'companies',
  });

  Company.associate = function(models) {
    models.Company.hasMany(models.CompanyParameter);
  }


  Company.prototype.parameters = async function() {
    let queryBuilder = {
      where: {
        name: "DEVICE_FORM"
      }
    }
    let parameters = await this.getCompanyParameters(queryBuilder);

    parameters = parameters.map(f => JSON.parse(f.value))
    return parameters;
  }

  return Company;
};