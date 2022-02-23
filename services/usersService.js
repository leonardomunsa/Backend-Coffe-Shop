const md5 = require("md5");
const authService = require("./authServices");
const { findUserModel, createUserModel } = require("../models/usersModel");
const { userSchema } = require("../utils/schemas");
const errorHandling = require("../utils/errorHandling");
const { badRequest, conflict, notFound } = require("../utils/dictionary");

const createUserService = async ({ name, email, password }) => {
  // chamando validação do joi usando os dados passados e desestruturando erro caso exista
  const { error } = userSchema.validate({ email, password });
  if (error) throw errorHandling(badRequest, error.message);

  // chamando função da camada de modelo para verificar se usuário já existe
  const user = await findUserModel(email);
  if (user) throw errorHandling(conflict, "User already exists");

  // criptografando senha
  const hashPassword = md5(password);

  const userId = await createUserModel(name, email, hashPassword);

  return {
    _id: userId,
    name,
    email,
  };
};

const loginUserService = async ({ email, password }) => {
  const { error } = userSchema.validate({ email, password });
  if (error) throw errorHandling(badRequest, error.message);

  const user = await findUserModel(email);
  if (!user) throw errorHandling(notFound, "User not found");

  const hashPassword = md5(password);
  if (user.password !== hashPassword)
    throw errorHandling(conflict, "Incorrect password");

  // retirando senha para criação de token
  const { password: _password, ...userInfosWithoutPassword } = user;

  const token = authService.generateToken(userInfosWithoutPassword);

  return token;
};

module.exports = {
  createUserService,
  loginUserService,
};
