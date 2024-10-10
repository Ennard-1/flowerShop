const express = require("express");
const app = express();
const publicRoutes = require("./routes/publicRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const viewRoutes = require("./routes/viewRoutes");
const path = require("path");
// Middleware
app.use(express.json());

// Rotas
app.use("/api", publicRoutes);
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
// Inicie o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Configuração do EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Usar as rotas
app.use("/", viewRoutes);
