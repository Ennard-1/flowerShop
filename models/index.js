import { Sequelize } from 'sequelize';
import ProductModel from './product.js';
import ProductImageModel from './productImage.js';
import ProductTagModel from './productTag.js';
import TagModel from './tag.js';
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./data/database.sqlite",
});

const models = {
  Product: ProductModel(sequelize, Sequelize.DataTypes),
  ProductImage: ProductImageModel(sequelize, Sequelize.DataTypes),
  ProductTag: ProductTagModel(sequelize, Sequelize.DataTypes),
  Tag: TagModel(sequelize, Sequelize.DataTypes),
};

// Configurar associações
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { sequelize, models };




