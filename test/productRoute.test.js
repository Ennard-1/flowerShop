const http = require('http');

const options = {
  hostname: 'localhost', // ou o endereço do seu servidor
  port: 3000, // porta do seu servidor
  method: 'GET',
};

// Função para realizar uma requisição e exibir o resultado
const makeRequest = (path) => {
  return new Promise((resolve, reject) => {
    const req = http.request({ ...options, path }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({ statusCode: res.statusCode, data });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
};

// Função para testar as rotas da API
const testApi = async () => {
  try {
    // Testar rota para obter todos os produtos
    let response = await makeRequest('/api/products');
    console.log('GET /api/products');
    console.log('Status Code:', response.statusCode);
    console.log('Response:', response.data);

    // Testar rota para obter um produto específico pelo slug
    const slug = 'rose'; // Substitua pelo slug real que você deseja testar
    response = await makeRequest(`/api/products/${slug}`);
    console.log(`GET /api/products/${slug}`);
    console.log('Status Code:', response.statusCode);
    console.log('Response:', response.data);

  } catch (error) {
    console.error('Error:', error);
  }
};

// Execute os testes
testApi();
