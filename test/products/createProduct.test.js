const axios = require('axios');

// URL base da API
const baseUrl = 'http://localhost:3000';

const testCreateProduct = async () => {
  try {
    // Realizar login para obter o token JWT
    console.log('Tentando fazer login como administrador...');
    const loginResponse = await axios.post(`${baseUrl}/api/login`, {
      password: 'admin', // Certifique-se de que a senha está correta e igual à variável no .env
    });

    // Verificar se o login foi bem-sucedido e se o token foi gerado
    const token = loginResponse.data.token;
    if (!token) {
      throw new Error('Falha ao obter o token JWT');
    }
    console.log('Login bem-sucedido. Token JWT recebido:', token);

    // Dados do produto a ser criado
    const productData = {
      name: 'Produto Teste',
      slug: 'produto-teste',
      description: 'Descrição do produto teste',
      quantity: 10,
    };

    // Criar o novo produto
    console.log('Tentando criar o produto...');
    const createProductResponse = await axios.post(
      `${baseUrl}/api/products`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Certifique-se de que o token JWT está correto
        },
      }
    );

    // Exibir o resultado da criação
    console.log('Produto criado com sucesso:', createProductResponse.data);
  } catch (error) {
    // Exibir mensagens de erro detalhadas
    console.error('Erro ao criar o produto:', error.response?.data || error.message);
  }
};

// Executar o teste de criação de produto
testCreateProduct();
