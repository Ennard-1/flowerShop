import { models } from '../models/index.js';

const { ProductTag } = models;

export const addTagToProduct = async (req, res) => {
  try {
    const { productId, tagId } = req.params;

    const productTag = await ProductTag.create({ productId, tagId });

    res.status(201).json(productTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar a tag ao produto' });
  }
};

export const getProductTags = async (req, res) => {
  try {
    const { productId } = req.params;

    const productTags = await ProductTag.findAll({ where: { productId } });

    res.status(200).json(productTags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar as tags do produto' });
  }
};

export const removeTagFromProduct = async (req, res) => {
  try {
    const { productId, tagId } = req.params;

    const productTag = await ProductTag.findOne({ where: { productId, tagId } });

    if (!productTag) {
      return res.status(404).json({ error: 'Associação entre produto e tag não encontrada' });
    }

    await productTag.destroy();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover a tag do produto' });
  }
};
