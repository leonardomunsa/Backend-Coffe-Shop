/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { createProductService } = require("../services/productsService");
const { created } = require("../utils/dictionary");

const createProductController = async (req, res, next) => {
  try {
    const { name, image, price, components } = req.body;

    const productCreated = await createProductService({
      name,
      image,
      price,
      components,
    });

    return res.status(created).json(productCreated);
  } catch (error) {
    console.log(`POST PRODUCT -> ${error.message}`);
    next(error);
  }
};

module.exports = {
  createProductController,
};
