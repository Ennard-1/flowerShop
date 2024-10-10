const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { authenticateJWT, isAdmin } = require("../middleware/auth");
const {
  createProductImage,
  removeProductImage,
} = require("../controllers/productImageController");
const router = express.Router();

// Rotas de Produtos
// Rota protegida para criar produto
router.post("/products", authenticateJWT, isAdmin, createProduct);

// Rota protegida para atualizar produto
router.put("/products/:id", authenticateJWT, isAdmin, updateProduct);

// Rota protegida para deletar produto
router.delete("/products/:id", authenticateJWT, isAdmin, deleteProduct);

// Rotas de imagens
// Rota protegida para criar uma imagem de produto
router.post("/products/images", authenticateJWT, isAdmin, createProductImage);
/// Rota para remover uma imagem de produto
router.delete(
  "/products/images/:imageName",
  authenticateJWT,
  isAdmin,
  removeProductImage
);

module.exports = router;
