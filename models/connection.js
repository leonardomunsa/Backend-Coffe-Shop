/* eslint-disable no-console */
const mongodb = require("mongodb").MongoClient;
require("dotenv").config();

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
