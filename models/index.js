const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./data/database.sqlite",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Carregar os modelos
db.Product = require("./product").default(sequelize, DataTypes);
db.Tag = require("./tag").default(sequelize, DataTypes);
db.ProductImage = require("./productImage").default(sequelize, DataTypes);

// Definindo a associação muitos-para-muitos entre Product e Tag
db.Product.belongsToMany(db.Tag, {
  through: "ProductTags",
  foreignKey: 'productId',
  as: 'tags'
});

db.Tag.belongsToMany(db.Product, {
  through: "ProductTags",
  foreignKey: 'tagId',
  as: 'products'
});

// Definindo as associações um-para-muitos entre Product e ProductImage
db.Product.hasMany(db.ProductImage, { foreignKey: 'productId' });
db.ProductImage.belongsTo(db.Product, { foreignKey: 'productId' });

module.exports = db;
