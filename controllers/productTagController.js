import { models } from '../models/index.js';

const { ProductTag , Product,Tag} = models;

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
  const { productId } = req.params;
  try {
      // Busca o produto e suas tags associadas
      const product = await Product.findByPk(productId, {
          include: [{ model: Tag, as: 'tags' }]
      });

      if (!product) {
          return res.status(404).json({ message: 'Produto não encontrado.' });
      }

      // Retorna as tags do produto, apenas com o nome da tag
      const tags = product.tags.map(tag => tag.name);
      res.json(tags);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar tags do produto.' });
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
