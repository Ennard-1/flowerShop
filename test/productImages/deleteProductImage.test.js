const axios = require("axios");

// URL base da API
const baseUrl = "http://localhost:3000";

const testDeleteProductImage = async () => {
  try {
    // Primeiro, faça o login como administrador para obter o token JWT
    console.log("Realizando login como administrador...");
    const loginResponse = await axios.post(`${baseUrl}/api/login`, {
      password: "admin", // A senha do administrador conforme definida no .env
    });

    const token = loginResponse.data.token;
    console.log("Login bem-sucedido. Token JWT:", token);

    // ID da imagem que deseja deletar
    const imageName = "1728586540329-testImage1.png"; // Substitua pelo ID correto da imagem existente

    // Agora, deletar a imagem existente
    console.log(`Deletando a imagem com ID ${imageName}...`);
    const deleteImageResponse = await axios.delete(
      `${baseUrl}/api/products/images/${imageName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Imagem deletada com sucesso:", deleteImageResponse.data);
  } catch (error) {
    console.error(
      "Erro durante o teste de remoção de imagem:",
      error.response?.data || error.message
    );
  }
};

// Executa o teste
testDeleteProductImage();
