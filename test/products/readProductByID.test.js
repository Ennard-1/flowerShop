const axios = require("axios");

// URL base da API
const baseUrl = "http://localhost:3000";

const testReadProduct = async (productId) => {
  try {
    console.log(`Lendo o produto com ID ${productId}...`);
    const readProductResponse = await axios.get(
      `${baseUrl}/api/products/${productId}`
    );
    console.log("Produto encontrado:", readProductResponse.data);
  } catch (error) {
    console.error(
      "Erro ao ler o produto:",
      error.response?.data || error.message
    );
  }
};

// Executar o teste de leitura com um ID de produto
testReadProduct(1);
