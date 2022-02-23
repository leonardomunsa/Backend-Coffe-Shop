const md5 = require("md5");
const authService = require("./authServices");
const { findUserModel, createUserModel } = require("../models/usersModel");
const { userSchema } = require("../utils/schemas");
const errorHandling = require("../utils/errorHandling");
const { badRequest, conflict, notFound } = require("../utils/dictionary");

const createUserService = async ({ name, email, password }) => {
  const { error } = userSchema.validate({ email, password });
  if (error) throw errorHandling(badRequest, error.message);

  const user = await findUserModel(email);
  if (user) throw errorHandling(conflict, "User already exists");

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

  const { password: _password, ...userEmail } = user;

  const token = authService.generateToken(userEmail);

  return token;
};

module.exports = {
  createUserService,
  loginUserService,
};
