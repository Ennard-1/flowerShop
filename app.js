const express = require("express");
const app = express();
const publicRoutes = require("./routes/publicRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors");
const path = require("path");
const { sequelize } = require('./models');
// Middleware
app.use(express.json());
app.use(cors());


sequelize.sync({ force: false })  // ou { force: true } para recriar as tabelas (perde dados)
  .then(() => {
    console.log('Database synced');
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });

// Rotas
app.use("/api", publicRoutes);
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
// Inicie o servidor
const PORT = process.env.PORT || 3000;
app.listen(3000, '0.0.0.0', () => {
  console.log('API rodando em http://0.0.0.0:3000');
});


