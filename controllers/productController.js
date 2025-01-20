import { models } from '../models/index.js';

const { Product } = models;

export const createProduct = async (req, res) => {
  try {
    const { name, description, slug, quantity, price } = req.body;

    const product = await Product.create({ name, description, slug, quantity, price });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o produto' });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar os produtos' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o produto' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, slug, quantity, price } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await product.update({ name, description, slug, quantity, price });

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o produto' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await product.destroy();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar o produto' });
  }
};
