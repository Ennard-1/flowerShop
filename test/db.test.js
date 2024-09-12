const db = require('../models/index'); // Atualize o caminho conforme necessário

async function runTests() {
  try {
    // Sincronizar o banco de dados
    await db.sequelize.sync({ force: true });
    console.log('Banco de dados sincronizado.');

    // Criar Tags
    const tag1 = await db.Tag.create({ name: 'Indoor' });
    const tag2 = await db.Tag.create({ name: 'Outdoor' });
    console.log('Tags criadas.');

    // Criar Produto
    const product = await db.Product.create({
      name: 'Rose',
      description: 'A beautiful rose',
      slug: 'rose',
      quantity: 100
    });
    console.log('Produto criado.');

    // Associar Tags ao Produto
    await product.addTags([tag1, tag2]);
    console.log('Tags associadas ao produto.');

    // Criar Imagens para o Produto
    await db.ProductImage.create({
      image: 'rose1.jpg',
      productId: product.id
    });
    await db.ProductImage.create({
      image: 'rose2.jpg',
      productId: product.id
    });
    console.log('Imagens criadas para o produto.');

    // Testar se o Produto foi criado corretamente
    const fetchedProduct = await db.Product.findByPk(product.id, {
      include: [
        { model: db.Tag, through: { attributes: [] } },
        db.ProductImage
      ]
    });

    console.log('Produto recuperado:');
    console.log(`Nome: ${fetchedProduct.name}`);
    console.log(`Descrição: ${fetchedProduct.description}`);
    console.log(`Slug: ${fetchedProduct.slug}`);
    console.log(`Quantidade: ${fetchedProduct.quantity}`);
    console.log(`Tags: ${fetchedProduct.Tags.map(tag => tag.name).join(', ')}`);
    console.log(`Imagens: ${fetchedProduct.ProductImages.map(img => img.image).join(', ')}`);

    // Validações simples
    if (fetchedProduct.name !== 'Rose') throw new Error('Nome do produto está incorreto');
    if (fetchedProduct.description !== 'A beautiful rose') throw new Error('Descrição do produto está incorreta');
    if (fetchedProduct.slug !== 'rose') throw new Error('Slug do produto está incorreto');
    if (fetchedProduct.quantity !== 100) throw new Error('Quantidade do produto está incorreta');
    if (fetchedProduct.Tags.length !== 2) throw new Error('Número de tags associadas está incorreto');
    if (fetchedProduct.ProductImages.length !== 2) throw new Error('Número de imagens associadas está incorreto');

    console.log('Todos os testes passaram com sucesso.');
  } catch (error) {
    console.error('Erro durante os testes:', error);
  } finally {
    // Fecha a conexão com o banco de dados
    await db.sequelize.close();
    console.log('Conexão com o banco de dados fechada.');
  }
}

runTests();
