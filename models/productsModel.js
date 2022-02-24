require("dotenv").config();
const { ObjectId } = require("mongodb");
const connection = require("./connection");

const { PORT } = process.env;

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
  await db
    .collection("products")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, price, image }, $push: { components } }
    );
};

const updateProductModelWithoutComponents = async (
  id,
  { name, price, image }
) => {
  const db = await connection();
  await db
    .collection("products")
    .updateOne({ _id: new ObjectId(id) }, { $set: { name, price, image } });
};

const deleteProductModel = async (id) => {
  const db = await connection();
  await db.collection("products").deleteOne({ _id: new ObjectId(id) });
};

const uploadImageProductModel = async (id, img) => {
  const db = await connection();
  await db.collection("products").updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: { image: `localhost:${PORT}/uploads/${img}` },
    }
  );
};

const getImageProductModel = async (img) => {
  const db = await connection();
  const image = db
    .collection("products")
    .findOne({ image: `localhost:${PORT}/uploads/${img}` });

  return image;
};

// const updateComponentsProductModel = async ()

module.exports = {
  findProductModel,
  getProductModel,
  getProductsModel,
  createProductModel,
  updateProductModel,
  updateProductModelWithoutComponents,
  deleteProductModel,
  uploadImageProductModel,
  getImageProductModel,
};
