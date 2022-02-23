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
  quantity: Joi.number().required(),
  measurement: Joi.string().required().min(1),
  unitPrice: Joi.number().required(),
});

module.exports = {
  userSchema,
  ingredientSchema,
};
