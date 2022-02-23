const connection = require("./connection");

const createProductModel = async ({ name, image, price, components }) => {
  const db = await connection();
  const { insertedId } = await db.collection("products").insertOne({
    name,
    image,
    price,
    components,
  });

  return insertedId;
};

module.exports = {
  createProductModel,
};
