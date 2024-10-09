const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

// URL base da API
const baseUrl = "http://localhost:3000";

const testUploadImage = async () => {
  try {
    // 1. Realizar login do administrador para obter o token JWT
    console.log("Realizando login como administrador...");
    const loginResponse = await axios.post(`${baseUrl}/api/login`, {
      password: "admin", // Mesma senha que está no .env
    });

    const token = loginResponse.data.token;
    console.log("Login bem-sucedido. Token JWT:", token);

    // 2. Criar um formulário com a imagem e o ID do produto
    const formData = new FormData();
    const imagePath = path.join(__dirname, "testImage1.png"); // Substitua pelo caminho real do arquivo que deseja enviar
    const productId = 3; // Substitua pelo ID do produto desejado
    formData.append("image", fs.createReadStream(imagePath));
    formData.append("productId", productId);

    // 3. Enviar a imagem para o servidor
    console.log("Enviando imagem para o servidor...");
    const uploadResponse = await axios.post(
      `${baseUrl}/api/product-images`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${token}`, // Adiciona o token de autenticação no cabeçalho
        },
      }
    );

    console.log("Imagem enviada com sucesso:", uploadResponse.data);
  } catch (error) {
    console.error(
      "Erro durante o upload:",
      error.response?.data || error.message
    );
  }
};

// Executa o teste
testUploadImage();
