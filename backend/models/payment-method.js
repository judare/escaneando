export default (sequelize, DataTypes) => {
  const PaymentMethod = sequelize.define(
    "PaymentMethod",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(50), allowNull: false },
      type: { type: DataTypes.STRING(45), allowNull: true },
      image: { type: DataTypes.STRING(255), allowNull: true },
      images: {
        type: DataTypes.TEXT,
        get() {
          const json = this.getDataValue("images");
          return JSON.parse(json);
        },
      },
      provider: { type: DataTypes.STRING(255), allowNull: false },
      providerArg: { type: DataTypes.STRING(255), allowNull: false },
      enabled: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
      },
      sort: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
      meta: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          const json = this.getDataValue("meta");
          return JSON.parse(json || "{}");
        },
        set(value) {
          this.setDataValue("meta", JSON.stringify(value));
        },
      },
    },
    {
      paranoid: true,
      tableName: "payment_methods",
    }
  );

  
  return PaymentMethod;
};