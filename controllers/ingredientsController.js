/* eslint-disable no-console */
/* eslint-disable consistent-return */
const { createIngredientsService } = require("../services/ingredientsService");
const { created } = require("../utils/dictionary");

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
};
