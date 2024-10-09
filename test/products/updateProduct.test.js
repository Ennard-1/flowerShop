const axios = require("axios");

// URL base da API
const baseUrl = "http://localhost:3000";

const testUpdateProduct = async (productId) => {
  try {
    // Realizar login para obter o token JWT
    const loginResponse = await axios.post(`${baseUrl}/api/login`, {
      password: "admin", // Senha configurada no .env
    });
    const token = loginResponse.data.token;

    // Atualizar o produto
    console.log(`Atualizando o produto com ID ${productId}...`);
    const updateProductResponse = await axios.put(
      `${baseUrl}/api/products/${productId}`,
      {
        name: "Produto Teste Atualizado",
        quantity: 20,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Produto atualizado com sucesso:", updateProductResponse.data);
  } catch (error) {
    console.error(
      "Erro ao atualizar o produto:",
      error.response?.data || error.message
    );
  }
};

// Executar o teste de atualização com um ID de produto
testUpdateProduct(1);
