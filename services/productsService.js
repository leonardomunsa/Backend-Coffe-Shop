const {
  createProductModel,
  getProductModel,
  getProductsModel,
  findProductModel,
  updateProductModel,
  deleteProductModel,
} = require("../models/productsModel");
const { productSchema, productSchemaUpdate } = require("../utils/schemas");
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

const updateProductService = async (id, { name, image, price, components }) => {
  const { error } = productSchemaUpdate.validate({
    name,
    image,
    price,
    components,
  });
  if (error) throw errorHandling(badRequest, error.message);

  const productToUpdate = await getProductModel(id);
  if (!productToUpdate) throw errorHandling(notFound, "Product not found");

  // preenchendo campos com valores já existentes do produto caso sejam nulos
  const updatedProduct = await updateProductModel(id, {
    name: name || productToUpdate.name,
    image: image || productToUpdate.image,
    price: price || productToUpdate.price,
    components: components || productToUpdate.components,
  });

  return updatedProduct;
};

const deleteProductService = async (id) => {
  await deleteProductModel(id);
};

module.exports = {
  getProductService,
  getProductsService,
  createProductService,
  updateProductService,
  deleteProductService,
};
