export default (sequelize, DataTypes) => {
  const ProductTag = sequelize.define('ProductTag', {
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      },
      allowNull: false
    },
    tagId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tags',
        key: 'id'
      },
      allowNull: false
    }
  });

  ProductTag.associate = (models) => {
    ProductTag.belongsTo(models.Product, { foreignKey: 'productId' });
    ProductTag.belongsTo(models.Tag, { foreignKey: 'tagId' });
  };

  return ProductTag;
};
