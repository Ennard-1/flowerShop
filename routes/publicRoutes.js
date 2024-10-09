// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { readAllImages } = require("../controllers/productImageController");
// Rota para obter todos os produtos
router.get("/products", productController.getAllProducts);

// Rota para obter um produto específico pelo slug
router.get("/products/:id", productController.getProductById);
// Rota para obter todas as imagens de um produto
router.get("/products/:productId/images", readAllImages);

module.exports = router;
