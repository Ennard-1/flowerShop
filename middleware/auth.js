const jwt = require('jsonwebtoken');
require('dotenv').config(); // Carrega variáveis do .env

// Middleware para verificar JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extrai o token do cabeçalho

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido.' });
    }

    req.user = user; // Anexa os dados do usuário autenticado ao req
    next(); // Continua para a próxima função de middleware
  });
};

// Middleware para garantir que o usuário é admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Permitir o acesso
  } else {
    res.status(403).json({ error: 'Acesso negado. Apenas administradores podem realizar essa ação.' });
  }
};

module.exports = { authenticateJWT, isAdmin };
