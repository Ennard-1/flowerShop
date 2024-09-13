const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");

// Middleware
app.use(express.json());

// Rotas
app.use("/api", productRoutes);

// Inicie o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
