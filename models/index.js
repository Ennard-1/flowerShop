import { Sequelize } from 'sequelize';
import ProductModel from './product.js';
import ProductImageModel from './productImage.js';
import ProductTagModel from './productTag.js';
import TagModel from './tag.js';
import StoreSettingsModel from './storeSettings.js';
 // ✅ NOVO

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'mydb',
  process.env.DB_USER || 'user',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
);
export const models = {
  Product: ProductModel(sequelize, Sequelize.DataTypes),
  ProductImage: ProductImageModel(sequelize, Sequelize.DataTypes),
  ProductTag: ProductTagModel(sequelize, Sequelize.DataTypes),
  Tag: TagModel(sequelize, Sequelize.DataTypes),
  StoreSettings: StoreSettingsModel(sequelize, Sequelize.DataTypes), // ✅ NOVO
};

// Configurar associações
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});
