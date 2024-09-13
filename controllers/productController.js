// controllers/productController.js
const { Product, ProductImage, Tag } = require("../models"); // Ajuste o caminho conforme a estrutura do seu projeto

// Função para obter todos os produtos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: ProductImage,
          attributes: ["image"],
        },
        {
          model: Tag,
          attributes: ["name"],
        },
      ],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para obter um produto pelo slug
exports.getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({
      where: { slug },
      include: [
        {
          model: ProductImage,
          attributes: ["image"],
        },
        {
          model: Tag,
          attributes: ["name"],
        },
      ],
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
