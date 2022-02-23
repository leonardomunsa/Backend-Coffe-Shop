const { ObjectId } = require("mongodb");
const connection = require("./connection");

const findProductModel = async (name) => {
  const db = await connection();
  const product = await db.collection("products").findOne({ name });

  return product;
};

const getProductModel = async (id) => {
  const db = await connection();
  const product = await db
    .collection("products")
    .findOne({ _id: new ObjectId(id) });

  return product;
};

const getProductsModel = async () => {
  const db = await connection();
  const products = await db.collection("products").find().toArray();

  return products;
};

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
  findProductModel,
  getProductModel,
  getProductsModel,
  createProductModel,
};
