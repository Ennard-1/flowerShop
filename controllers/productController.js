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
          as: 'tags',
          attributes: ["name"],
        },
      ],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
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
      res.status(404).json({ message: "Produto não encontrado" });
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
      price
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o produto" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, slug, quantity, price, tagIds } = req.body;

    const product = await Product.findByPk(id, {
      include: ['tags'], // Incluindo as tags associadas ao produto (ajuste conforme seu modelo)
    });

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    // Atualizando as propriedades do produto
    product.name = name || product.name;
    product.description = description || product.description;
    product.slug = slug || product.slug;
    product.quantity = quantity || product.quantity;
    product.price = price || product.price;

    // Se a lista de tagIds for fornecida, associar as novas tags ao produto
    if (tagIds && tagIds.length > 0) {
      await product.setTags(tagIds); // Este método é gerado pelo Sequelize para atualizar as tags associadas
    }

    // Salvando as alterações no produto
    await product.save();

    // Retornando o produto atualizado com as tags associadas
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o produto" });
  }
};


// Deletar um produto existente
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    await product.destroy();
    res.status(200).json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o produto" });
  }
};
