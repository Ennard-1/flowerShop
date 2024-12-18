module.exports = (sequelize, DataTypes) => {
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
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // Valor decimal para preços
      allowNull: false,
      defaultValue: 0.00 // Valor padrão para evitar problemas com produtos antigos
    }
  });

  Product.associate = models => {
    Product.hasMany(models.ProductImage, { foreignKey: 'productId' });
    Product.belongsToMany(models.Tag, { through: 'ProductTags' });
  };

  return Product;
};
