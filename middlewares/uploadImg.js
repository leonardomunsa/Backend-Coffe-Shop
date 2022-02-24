const multer = require("multer");
const path = require("path");

const directory = path.resolve(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, directory),
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

module.exports = multer({ storage });
