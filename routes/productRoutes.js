// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Rota para obter todos os produtos
router.get("/products", productController.getAllProducts);

// Rota para obter um produto específico pelo slug
router.get("/products/:slug", productController.getProductBySlug);

module.exports = router;
