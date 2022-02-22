const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string()
    .required()
    .regex(/^[\w-\\.]+@([\w-])+[\w-\\.]{2,4}$/m)
    .messages({
      "string.pattern.base": '"email" must be a valid email',
    }),
  password: Joi.string().required(),
});

module.exports = {
  userSchema,
};
