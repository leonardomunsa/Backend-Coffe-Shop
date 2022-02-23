const express = require("express");
const {
  createIngredientsController,
  getIngredientsController,
} = require("../controllers/ingredientsController");
const auth = require("../middlewares/auth");

const ingredientRouter = express.Router();

ingredientRouter.post("/", auth, createIngredientsController);

ingredientRouter.get("/", getIngredientsController);

module.exports = ingredientRouter;
