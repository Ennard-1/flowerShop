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

// Criar um novo produto
exports.createProduct = async (req, res) => {
  try {
    const { name, description, slug, quantity } = req.body;
    const newProduct = await Product.create({
      name,
      description,
      slug,
      quantity,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o produto" });
  }
};

// Atualizar um produto existente
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, slug, quantity } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.slug = slug || product.slug;
    product.quantity = quantity || product.quantity;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o produto" });
  }
};
