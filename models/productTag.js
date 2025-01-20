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
  
    return ProductTag;
  };
  