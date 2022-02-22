/* eslint-disable consistent-return */
/* eslint-disable no-console */
const {
  createUserService,
  loginUserService,
} = require("../services/usersService");
const { created } = require("../utils/dictionary");

const createUserController = async (req, res, next) => {
  try {
    const userCreated = await createUserService(req.body);

    return res.status(created).json(userCreated);
  } catch (error) {
    console.log(`POST CREATE USERS -> ${error.message}`);
    next(error);
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const token = await loginUserService(req.body);

    return res.status(created).json({ token });
  } catch (error) {
    console.log(`POST LOGIN USERS -> ${error.message}`);
    next(error);
  }
};

module.exports = {
  createUserController,
  loginUserController,
};
