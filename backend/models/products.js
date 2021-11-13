export default (sequelize, DataTypes) => {

	const Product = sequelize.define('Product', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
		image: { type: DataTypes.STRING, allowNull: false },
		description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: true },
    discount: { type: DataTypes.INTEGER, allowNull: true },
    enabled: { type: DataTypes.TINYINT, allowNull: true },
    commerceId: { type: DataTypes.INTEGER, allowNull: true },
    categoryId: { type: DataTypes.INTEGER, allowNull: true },
    creatorId: { type: DataTypes.INTEGER, allowNull: true },
  }, 
  {
    paranoid: true,
    tableName: 'products',
  });

  Product.associate = function(models) {
    models.Product.belongsTo(models.Commerce);
    models.Product.belongsTo(models.ProductCategory, { foreignKey: "categoryId" });
    models.Product.belongsTo(models.User, { foreignKey: "creatorId" });
  };
  
  return Product;
};