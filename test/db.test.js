const db = require('../models/index'); // Atualize o caminho conforme necessário

async function runTests() {
  try {
    // Sincronizar o banco de dados
    await db.sequelize.sync({ force: true });
    console.log('Banco de dados sincronizado.');

    // Criar Tags
    const tag1 = await db.Tag.create({ name: 'Indoor' });
    const tag2 = await db.Tag.create({ name: 'Outdoor' });
    const tag3 = await db.Tag.create({ name: 'Sale' });
    const tag4 = await db.Tag.create({ name: 'New' });
    console.log('Tags criadas.');

    // Criar Produtos
    const products = [
      {
        name: 'Rose',
        description: 'A beautiful rose',
        slug: 'rose',
        quantity: 100,
        images: ['rose1.jpg', 'rose2.jpg'],
        tags: [tag1.id, tag2.id]
      },
      {
        name: 'Tulip',
        description: 'A vibrant tulip',
        slug: 'tulip',
        quantity: 50,
        images: ['tulip1.jpg', 'tulip2.jpg'],
        tags: [tag2.id, tag3.id]
      },
      {
        name: 'Sunflower',
        description: 'A bright sunflower',
        slug: 'sunflower',
        quantity: 75,
        images: ['sunflower1.jpg'],
        tags: [tag1.id, tag4.id]
      }
    ];

    // Adicionar Produtos e suas Imagens e Tags
    for (const productData of products) {
      const product = await db.Product.create({
        name: productData.name,
        description: productData.description,
        slug: productData.slug,
        quantity: productData.quantity
      });

      // Adicionar Imagens
      await Promise.all(productData.images.map(image => 
        db.ProductImage.create({
          image,
          productId: product.id
        })
      ));

      // Associar Tags
      await product.addTags(productData.tags);
    }
    console.log('Produtos, imagens e tags criados e associados.');

    // Testar se os Produtos foram criados corretamente
    for (const productData of products) {
      const fetchedProduct = await db.Product.findOne({
        where: { slug: productData.slug },
        include: [
          { model: db.Tag, through: { attributes: [] } },
          db.ProductImage
        ]
      });

      console.log(`Produto recuperado: ${productData.name}`);
      console.log(`Nome: ${fetchedProduct.name}`);
      console.log(`Descrição: ${fetchedProduct.description}`);
      console.log(`Slug: ${fetchedProduct.slug}`);
      console.log(`Quantidade: ${fetchedProduct.quantity}`);
      console.log(`Tags: ${fetchedProduct.Tags.map(tag => tag.name).join(', ')}`);
      console.log(`Imagens: ${fetchedProduct.ProductImages.map(img => img.image).join(', ')}`);

      // Validações simples
      if (fetchedProduct.name !== productData.name) throw new Error(`Nome do produto "${productData.slug}" está incorreto`);
      if (fetchedProduct.description !== productData.description) throw new Error(`Descrição do produto "${productData.slug}" está incorreta`);
      if (fetchedProduct.slug !== productData.slug) throw new Error(`Slug do produto "${productData.slug}" está incorreto`);
      if (fetchedProduct.quantity !== productData.quantity) throw new Error(`Quantidade do produto "${productData.slug}" está incorreta`);
      if (fetchedProduct.Tags.length !== productData.tags.length) throw new Error(`Número de tags associadas ao produto "${productData.slug}" está incorreto`);
      if (fetchedProduct.ProductImages.length !== productData.images.length) throw new Error(`Número de imagens associadas ao produto "${productData.slug}" está incorreto`);
    }

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
