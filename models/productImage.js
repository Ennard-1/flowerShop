module.exports = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define('ProductImage', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        },
        allowNull: false
      }
    });
  
    ProductImage.associate = models => {
      ProductImage.belongsTo(models.Product, { foreignKey: 'productId' });
    };
  
    return ProductImage;
  };
  