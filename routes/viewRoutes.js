const express = require("express");
const router = express.Router();

router.get("/products", (req, res) => {
  res.render("products"); // Renderiza a view products.ejs
});
// Rota para obter um produto único e renderizar a view
router.get("/products/:productId", (req, res) => {
  res.render("product"); // Renderiza a view 'product.ejs'
});

module.exports = router;
