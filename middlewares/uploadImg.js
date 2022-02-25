const multer = require("multer");
const path = require("path");

// middleware de upload de imagens, indicando diretório onde são salvas e qual será o nome do arquivo

const directory = path.resolve(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, directory),
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

module.exports = multer({ storage });
