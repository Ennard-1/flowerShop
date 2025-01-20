export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    }
  });

  Product.associate = (models) => {
    Product.hasMany(models.ProductImage, { foreignKey: 'productId', as: 'images' });
    Product.belongsToMany(models.Tag, {
      through: models.ProductTag,
      foreignKey: 'productId',
      as: 'tags'
    });
  };

  return Product;
};
