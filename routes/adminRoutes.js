const express = require('express');
const { createProduct, updateProduct } = require('../controllers/productController');
const { authenticateJWT, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Rota protegida para criar produto
router.post('/products', authenticateJWT, isAdmin, createProduct);

// Rota protegida para atualizar produto
router.put('/products/:id', authenticateJWT, isAdmin, updateProduct);

module.exports = router;
