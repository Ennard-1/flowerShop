const axios = require('axios');

// URL base da API
const baseUrl = 'http://localhost:3000';

const testReadAllProducts = async () => {
  try {
    // Ler todos os produtos (sem autenticação)
    console.log('Tentando obter todos os produtos...');
    const readAllProductsResponse = await axios.get(`${baseUrl}/api/products`);

    // Exibir o resultado da listagem de produtos
    console.log('Lista de produtos obtida com sucesso:', readAllProductsResponse.data);
  } catch (error) {
    // Exibir mensagens de erro detalhadas
    console.error('Erro ao obter produtos:', error.response?.data || error.message);
  }
};

// Executar o teste para ler todos os produtos
testReadAllProducts();
