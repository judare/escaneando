export default (sequelize, DataTypes) => {

	const ProductCategory = sequelize.define('ProductCategory', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
    commerceId: { type: DataTypes.INTEGER, allowNull: true },
  }, 
  {
    paranoid: true,
    tableName: 'product_categories',
  });

  ProductCategory.associate = function(models) {
    models.ProductCategory.belongsTo(models.Commerce);
    models.ProductCategory.hasMany(models.Product, { foreignKey: "categoryId" });
  };
  
  return ProductCategory;
};