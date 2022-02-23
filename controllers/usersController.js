/* eslint-disable consistent-return */
/* eslint-disable no-console */
const {
  createUserService,
  loginUserService,
} = require("../services/usersService");
const { created, success } = require("../utils/dictionary");

// middleware para rota de criação de usuários
const createUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // desestruturação do corpo de requisição para explicitação de infos passadas
    // e para evitar que outro campo extra seja passado para a função
    const userCreated = await createUserService({ name, email, password });

    return res.status(created).json(userCreated);
  } catch (error) {
    // log para printar erro e explicitar onde foi pego
    console.log(`POST CREATE USERS -> ${error.message}`);
    next(error);
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await loginUserService({ email, password });

    // passando token no endpoint para ser salvo no headers de autorização
    return res.status(success).json({ token });
  } catch (error) {
    console.log(`POST LOGIN USERS -> ${error.message}`);
    next(error);
  }
};

module.exports = {
  createUserController,
  loginUserController,
};
