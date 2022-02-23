const Joi = require("joi");

// documento para uso de objetos para validação por meio da biblioteca joi

// validação de email e senha, com modelo de email de acordo com padrão
const userSchema = Joi.object({
  email: Joi.string()
    .required()
    .regex(/^[\w-\\.]+@([\w-])+[\w-\\.]{2,4}$/m)
    .messages({
      "string.pattern.base": '"email" must be a valid email',
    }),
  password: Joi.string().required().min(6),
});

const ingredientSchema = Joi.object({
  name: Joi.string().required().min(1),
  measurement: Joi.string().required().min(1),
  unitPrice: Joi.number().required().min(0.1),
});

// validação de produto, com chave de componente sendo um array de objetos de ingredientes com quantidadee
const productSchema = Joi.object({
  name: Joi.string().required().min(1),
  image: Joi.string().min(1),
  price: Joi.number().required().min(0.1),
  components: Joi.array().items(
    Joi.object().keys({
      ingredient: Joi.string().required().min(1),
      quantity: Joi.number().min(1).required(),
    })
  ),
});

module.exports = {
  userSchema,
  ingredientSchema,
  productSchema,
};
