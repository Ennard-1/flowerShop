const axios = require('axios');

// URL base da API
const baseUrl = 'http://localhost:3000';

// Função para realizar login e obter o token JWT
const loginAsAdmin = async () => {
  try {
    console.log('Realizando login como administrador...');
    const loginResponse = await axios.post(`${baseUrl}/api/login`, {
      password: 'admin', // Mesma senha que está no .env
    });
    const token = loginResponse.data.token;
    console.log('Login bem-sucedido. Token JWT:', token);
    return token;
  } catch (error) {
    console.error('Erro ao realizar login:', error.response?.data || error.message);
    throw new Error('Falha no login');
  }
};

// Função para criar um novo produto
const createProduct = async (token) => {
  try {
    console.log('Criando um novo produto...');
    const createProductResponse = await axios.post(
      `${baseUrl}/api/products`,
      {
        name: 'Produto Teste',
        slug: 'produto-teste',
        description: 'Descrição do produto teste',
        quantity: 10,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Produto criado com sucesso:', createProductResponse.data);
    return createProductResponse.data;
  } catch (error) {
    console.error('Erro ao criar produto:', error.response?.data || error.message);
    throw new Error('Falha ao criar produto');
  }
};

// Função para atualizar um produto
const updateProduct = async (token, productId) => {
  try {
    console.log(`Atualizando o produto com ID ${productId}...`);
    const updateProductResponse = await axios.put(
      `${baseUrl}/api/products/${productId}`,
      {
        name: 'Produto Teste Atualizado',
        quantity: 20,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Produto atualizado com sucesso:', updateProductResponse.data);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error.response?.data || error.message);
    throw new Error('Falha ao atualizar produto');
  }
};

// Função principal para executar os testes
const runTests = async () => {
  try {
    const token = await loginAsAdmin(); // Login e obtenção do token
    // const product = await createProduct(token); // Criar produto
    await updateProduct(token, 1); // Atualizar produto
  } catch (error) {
    console.error('Erro durante os testes:', error.message);
  }
};

// Executa os testes
runTests();
