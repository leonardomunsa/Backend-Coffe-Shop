const connection = require("./connection");

const findUserModel = async (email) => {
  const db = await connection();
  const user = await db.collection("users").findOne({ email });

  return user;
};

const createUserModel = async ({ name, email, password }) => {
  const db = await connection();
  const { insertedId } = await db
    .collection("users")
    .insertOne({ name, email, password });

  return insertedId;
};

module.exports = {
  findUserModel,
  createUserModel,
};
