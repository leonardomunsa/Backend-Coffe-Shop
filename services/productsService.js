const { createProductModel } = require("../models/productsModel");
const { productSchema } = require("../utils/schemas");
const errorHandling = require("../utils/errorHandling");
const { badRequest } = require("../utils/dictionary");

const createProductService = async ({ name, image, price, components }) => {
  const { error } = productSchema.validate({ name, image, price, components });
  if (error) throw errorHandling(badRequest, error.message);

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
  createProductService,
};
