/* eslint-disable no-console */
/* eslint-disable consistent-return */
const {
  createIngredientsService,
  getIngredientsService,
} = require("../services/ingredientsService");
const { created, success } = require("../utils/dictionary");

const getIngredientsController = async (req, res, next) => {
  try {
    const ingredients = await getIngredientsService();

    return res.status(success).json(ingredients);
  } catch (error) {
    console.log(`GET INGREDIENTS -> ${error.message}`);
    next(error);
  }
};

const createIngredientsController = async (req, res, next) => {
  try {
    const { name, measurement, unitPrice } = req.body;

    const ingredientCreated = await createIngredientsService({
      name,
      measurement,
      unitPrice,
    });

    return res.status(created).json(ingredientCreated);
  } catch (error) {
    console.log(`POST CREATE ingredientsS -> ${error.message}`);
    next(error);
  }
};

module.exports = {
  createIngredientsController,
  getIngredientsController,
};
