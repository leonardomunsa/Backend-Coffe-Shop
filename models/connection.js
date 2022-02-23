/* eslint-disable no-console */
// documento de conexão com banco de dados mongodb, utilizando mongodb atlas que utiliza string de url para conexão
const mongodb = require("mongodb").MongoClient;
require("dotenv").config();

// puxando variáveis de ambiente do documento .env para segurança dos dados de conexão
const { MONGO_DB_URL } = process.env;
const { DB_NAME } = process.env;

module.exports = () =>
  mongodb
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => connection.db(DB_NAME))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
