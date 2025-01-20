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

const { createTag, deleteTag, updateTag, } = require("../controllers/tagController");
const { addTagToProduct, removeTagFromProduct } = require("../controllers/productTagController");

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

// Rotas de Tags
router.post("/tag", authenticateJWT, isAdmin, createTag)
router.delete("/tag/:id", authenticateJWT, isAdmin, deleteTag)
router.put("/tag/:id", authenticateJWT, isAdmin, updateTag)

// Rotas de ProductTags
router.post("/tags/:productId/:tagId", authenticateJWT, isAdmin, addTagToProduct)
router.delete("/product/:productId/:tagId", authenticateJWT, isAdmin, removeTagFromProduct)
module.exports = router;
