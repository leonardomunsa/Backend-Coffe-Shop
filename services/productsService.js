const {
  createProductModel,
  getProductModel,
  getProductsModel,
  findProductModel,
  updateProductModel,
  deleteProductModel,
  uploadImageProductModel,
  getImageProductModel,
  updateProductModelWithoutComponents,
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

  // caso o campo components esteja presente, será chamada função da camada modelo
  // que utiliza esse campo para inclusão de novo ingrediente no array
  if (components) {
    await updateProductModel(id, {
      name: name || productToUpdate.name,
      image: image || productToUpdate.image,
      price: price || productToUpdate.price,
      components,
    });
  }

  // caso o campo não esteja presente, são usados apenas os outros campos
  // se esses campos estiverem ausentes (forem nulos), utiliza-se o campo padrão do produto
  await updateProductModelWithoutComponents(id, {
    name: name || productToUpdate.name,
    image: image || productToUpdate.image,
    price: price || productToUpdate.price,
  });
};

const deleteProductService = async (id) => {
  await deleteProductModel(id);
};

const uploadImageProductService = async (id, img) => {
  if (!img.match(/\.(jpg|png|JPG|PNG)$/))
    throw errorHandling(badRequest, "Image must be jpg or png");

  await uploadImageProductModel(id, img);

  const { image } = await getProductModel(id);

  return image;
};

const getImageProductService = async (img) => {
  const image = await getImageProductModel(img);

  return image;
};

module.exports = {
  getProductService,
  getProductsService,
  createProductService,
  updateProductService,
  deleteProductService,
  uploadImageProductService,
  getImageProductService,
};
