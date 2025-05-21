const express = require("express");
const app = express();
const publicRoutes = require("./routes/publicRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors");
const path = require("path");
// Middleware
app.use(express.json());
app.use(cors());

// Rotas
app.use("/api", publicRoutes);
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
// Inicie o servidor
const PORT = process.env.PORT || 3000;
app.listen(3000, '0.0.0.0', () => {
  console.log('API rodando em http://0.0.0.0:3000');
});


