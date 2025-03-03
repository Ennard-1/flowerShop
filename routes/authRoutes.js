const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Carrega variáveis do .env

const router = express.Router();

router.post("/login", (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    // Gerar o token JWT
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    return res.json({ token }); // Enviar o token JWT para o cliente
  } else {
    return res.status(401).json({ error: "Senha incorreta" });
  }
});

module.exports = router;
