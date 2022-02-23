const express = require("express");
const {
  createProductController,
} = require("../controllers/productsController");

const userRouter = express.Router();

userRouter.post("/", createProductController);

module.exports = userRouter;
