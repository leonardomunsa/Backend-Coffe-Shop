/* eslint-disable no-console */
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
