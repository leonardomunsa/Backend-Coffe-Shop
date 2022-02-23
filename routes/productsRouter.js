const express = require("express");
const {
  createProductController,
  getProductController,
  getProductsController,
} = require("../controllers/productsController");
const auth = require("../middlewares/auth");

const productRouter = express.Router();

productRouter.post("/", auth, createProductController);
productRouter.get("/", getProductsController);
productRouter.get("/:id", getProductController);

module.exports = productRouter;
