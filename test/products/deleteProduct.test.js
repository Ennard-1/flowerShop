const axios = require("axios");

// URL base da API
const baseUrl = "http://localhost:3000";

const testDeleteProduct = async (productId) => {
  try {
    // Realizar login para obter o token JWT
    const loginResponse = await axios.post(`${baseUrl}/api/login`, {
      password: "admin", // Senha configurada no .env
    });
    const token = loginResponse.data.token;

    // Deletar o produto
    console.log(`Deletando o produto com ID ${productId}...`);
    const deleteProductResponse = await axios.delete(
      `${baseUrl}/api/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Produto deletado com sucesso:", deleteProductResponse.data);
  } catch (error) {
    console.error(
      "Erro ao deletar o produto:",
      error.response?.data || error.message
    );
  }
};

// Executar o teste de deleção com um ID de produto
testDeleteProduct(1);
