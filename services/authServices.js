/* eslint-disable no-console */
const jwt = require("jsonwebtoken");
require("dotenv").config();

// documento de configuração do token, com função para gerá-lo e verificá-lo

const { API_SECRET } = process.env;

const JWT_CONFIG = {
  expiresIn: "5h",
  algorithm: "HS256",
};

const generateToken = (data) => jwt.sign({ data }, API_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, API_SECRET);
    const user = decoded.data;

    // caso token esteja ok, info do usuário é passada para função de autenticação
    return user;
  } catch (error) {
    console.log(`FALHA NA AUTENTICAÇÃO -> ${error.message}`);
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
