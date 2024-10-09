const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Product, ProductImage } = require("../models");

// Configuração de multer para salvar as imagens no diretório 'uploads/'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./data/images"); // Pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filtro de arquivo para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Somente arquivos JPEG, JPG, ou PNG são permitidos!"));
  }
};

// Inicializa o multer para fazer upload de uma única imagem
const upload = multer({ storage, fileFilter }).single("image");

// Controller para criar uma imagem de produto
exports.createProductImage = async (req, res) => {
  // Faz o upload da imagem primeiro
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { productId } = req.body; // Obtém o productId do corpo da requisição

    try {
      // Verifica se o produto existe
      const product = await Product.findByPk(productId);
      if (!product) {
        // Se o produto não existir, remove a imagem do servidor
        if (req.file && req.file.path) {
          fs.unlink(req.file.path, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Erro ao remover o arquivo:", unlinkErr);
            }
          });
        }
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      // Cria a nova imagem associada ao produto
      const newProductImage = await ProductImage.create({
        image: req.file.path, // Caminho do arquivo salvo
        productId: product.id, // Associação com o produto
      });

      return res.status(201).json(newProductImage);
    } catch (error) {
      // Se houver algum erro durante o salvamento no banco, remove o arquivo
      if (req.file && req.file.path) {
        fs.unlink(req.file.path, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Erro ao remover o arquivo:", unlinkErr);
          }
        });
      }
      return res
        .status(500)
        .json({ error: "Erro ao salvar a imagem do produto" });
    }
  });
};

exports.readAllImages = async (req, res) => {
  const { productId } = req.params; // Obtém o ID do produto dos parâmetros da requisição

  try {
    // Busca todas as imagens associadas ao produto
    const images = await ProductImage.findAll({
      where: { productId },
    });

    if (images.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhuma imagem encontrada para este produto." });
    }

    return res.status(200).json(images);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
