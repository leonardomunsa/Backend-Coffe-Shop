const connection = require("./connection");

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
};
