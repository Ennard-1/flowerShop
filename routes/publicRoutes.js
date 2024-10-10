// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const path = require("path");
const productController = require("../controllers/productController");
const { readAllImages } = require("../controllers/productImageController");
// Rota para obter todos os produtos
router.get("/products", productController.getAllProducts);

// Rota para obter um produto específico pelo slug
router.get("/products/:id", productController.getProductById);
// Rota para obter todas as imagens de um produto
router.get("/products/:productId/images", readAllImages);

router.get("/products/images/:imageName", (req, res) => {
  const imageName = req.params.imageName; // nome do arquivo
  const imagePath = path.resolve("data/images", imageName);

  console.log(imagePath);
  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(404).send("Imagem não encontrada");
    }
  });
});

module.exports = router;
