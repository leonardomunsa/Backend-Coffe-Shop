const {
  createProductModel,
  getProductModel,
  getProductsModel,
  findProductModel,
} = require("../models/productsModel");
const { productSchema } = require("../utils/schemas");
const errorHandling = require("../utils/errorHandling");
const { badRequest, notFound, conflict } = require("../utils/dictionary");

const getProductService = async (id) => {
  const product = await getProductModel(id);
  if (!product) throw errorHandling(notFound, "Product not found");

  return product;
};

const getProductsService = async () => {
  const products = await getProductsModel();
  if (!products) throw errorHandling(notFound, "There is no products yet");

  return products;
};

const createProductService = async ({ name, image, price, components }) => {
  const { error } = productSchema.validate({ name, image, price, components });
  if (error) throw errorHandling(badRequest, error.message);

  const product = await findProductModel(name);
  if (product) throw errorHandling(conflict, "Product already exists");

  const productId = await createProductModel({
    name,
    image,
    price,
    components,
  });

  return {
    _id: productId,
    name,
    image,
    price,
    components,
  };
};

module.exports = {
  getProductService,
  getProductsService,
  createProductService,
};
