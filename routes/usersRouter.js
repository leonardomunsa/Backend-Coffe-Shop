const express = require("express");
const {
  createUserController,
  loginUserController,
} = require("../controllers/usersController");

const userRouter = express.Router();

userRouter.post("/create", createUserController);

userRouter.post("/login", loginUserController);

module.exports = userRouter;
