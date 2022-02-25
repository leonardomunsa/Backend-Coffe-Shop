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

// função para busca de preço do produto, utilizando aggregations no mongodb, abaixo link que me auxiliou
// no cálculo para o preço do produto
// https://stackoverflow.com/questions/52274806/mongodb-multiply-values-inside-two-arrays
const getPriceOfProductModel = async () => {
  const db = await connection();
  const price = db
    .collection("products")
    .aggregate([
      {
        $lookup: {
          from: "ingredients",
          let: { ingrediente: "$components.ingredient" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$name", "$$ingrediente"],
                },
              },
            },
          ],
          as: "ingredientsData",
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          price: {
            $sum: {
              $map: {
                input: { $range: [0, { $size: "$components" }] },
                as: "ix",
                in: {
                  $let: {
                    vars: {
                      pre: { $arrayElemAt: ["$components", "$$ix"] },
                      cal: {
                        $arrayElemAt: ["$ingredientsData", "$$ix"],
                      },
                    },
                    in: { $multiply: ["$$pre.quantity", "$$cal.unitPrice"] },
                  },
                },
              },
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          priceOfProduct: { $round: ["$price", 2] },
        },
      },
    ])
    .toArray();

  return price;
};

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
  getPriceOfProductModel,
};
