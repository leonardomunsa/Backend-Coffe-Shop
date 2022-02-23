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

const updateProductModel = async (id, { name, price, image, components }) => {
  const db = await connection();
  const updatedProduct = await db
    .collection("products")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, price, image }, $push: { components } }
    );

  return updatedProduct;
};

const deleteProductModel = async (id) => {
  const db = await connection();
  await db.collection("products").deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  findProductModel,
  getProductModel,
  getProductsModel,
  createProductModel,
  updateProductModel,
  deleteProductModel,
};
