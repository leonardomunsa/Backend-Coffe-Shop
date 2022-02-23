const express = require("express");
const {
  createProductController,
  getProductController,
  getProductsController,
  updateProductController,
  deleteProductController,
} = require("../controllers/productsController");
const auth = require("../middlewares/auth");

const productRouter = express.Router();

productRouter.post("/", auth, createProductController);
productRouter.get("/", getProductsController);
productRouter.put("/:id", updateProductController);
productRouter.delete("/:id", deleteProductController);
productRouter.get("/:id", getProductController);

module.exports = productRouter;
