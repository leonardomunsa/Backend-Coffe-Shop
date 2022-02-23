/* eslint-disable consistent-return */
const authService = require("../services/authServices");
const { unauthorized, serverError } = require("../utils/dictionary");

// middleware para autenticação de token de usuário, extraindo dos headers de autenticação
module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    // caso o token não esteja presente, retorna erro de não encontrado
    if (!authorization) {
      return res.status(unauthorized).json({ message: "Token not found" });
    }

    // caso exista, é chamada função de verificação e, caso não passe,
    // retorna erro de expiração ou de token inválido
    const user = authService.verifyToken(authorization);
    if (!user) {
      return res
        .status(unauthorized)
        .json({ message: "Expired or invalid token" });
    }

    // info do usuário feita pelo token é passado para a próxima função utilizada
    req.user = user;
    next();
  } catch (error) {
    return res.status(serverError).json({ message: "Internal Server Error" });
  }
};
