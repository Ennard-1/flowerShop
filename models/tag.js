export default (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Product, {
      through: models.ProductTag,
      foreignKey: 'tagId',
      as: 'products'
    });
  };

  return Tag;
};
