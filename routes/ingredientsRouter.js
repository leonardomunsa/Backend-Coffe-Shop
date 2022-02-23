const express = require("express");
const {
  createIngredientsController,
} = require("../controllers/ingredientsController");

const ingredientRouter = express.Router();

ingredientRouter.post("/", createIngredientsController);

ingredientRouter.get("/", getIngredientsController);

module.exports = ingredientRouter;
