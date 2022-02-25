const express = require("express");
const path = require("path");
const uploadImg = require("../middlewares/uploadImg");
const {
  createProductController,
  getProductController,
  getProductsController,
  updateProductController,
  deleteProductController,
  uploadImageProductController,
  getPriceOfProductController,
} = require("../controllers/productsController");
const auth = require("../middlewares/auth");

const productRouter = express.Router();

productRouter.use(
  "/images",
  express.static(path.join(__dirname, "..", "uploads"))
);

// rotas relacionadas aos produtos, com middleware de autenticação para controle
productRouter.post("/", auth, createProductController);
productRouter.get("/", getProductsController);
productRouter.get("/price", auth, getPriceOfProductController);
productRouter.put("/:id", auth, updateProductController);
productRouter.delete("/:id", auth, deleteProductController);
productRouter.get("/:id", auth, getProductController);
productRouter.put(
  "/:id/image",
  auth,
  uploadImg.single("image"),
  uploadImageProductController
);

module.exports = productRouter;
