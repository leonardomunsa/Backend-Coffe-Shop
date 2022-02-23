const {
  findingredientsModel,
  createingredientsModel,
} = require("../models/ingredientsModel");
const { ingredientSchema } = require("../utils/schemas");
const errorHandling = require("../utils/errorHandling");
const { badRequest, conflict } = require("../utils/dictionary");

const createIngredientsService = async ({ name, measurement, unitPrice }) => {
  const { error } = ingredientSchema.validate({
    name,
    measurement,
    unitPrice,
  });
  if (error) throw errorHandling(badRequest, error.message);

  const ingredient = await findingredientsModel(name);
  if (ingredient) throw errorHandling(conflict, "ingredient already exists");

  const ingredientId = await createingredientsModel(
    name,
    measurement,
    unitPrice
  );

  return {
    _id: ingredientId,
    name,
    measurement,
    unitPrice,
  };
};

module.exports = {
  createIngredientsService,
};
