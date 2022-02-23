const connection = require("./connection");

const getIngredientsModel = async () => {
  const db = await connection();
  const ingredients = await db.collection("ingredients").find().toArray();

  return ingredients;
};

const findIngredientModel = async (name) => {
  const db = await connection();
  const ingredient = await db.collection("ingredients").findOne({ name });

  return ingredient;
};

const createIngredientModel = async (name, measurement, unitPrice) => {
  const db = await connection();
  const { insertedId } = await db
    .collection("ingredients")
    .insertOne({ name, measurement, unitPrice });

  return insertedId;
};

module.exports = {
  findIngredientModel,
  createIngredientModel,
  getIngredientsModel,
};
