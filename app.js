const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
// Middleware
app.use(express.json());

// Rotas
app.use("/api", productRoutes);
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
// Inicie o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
