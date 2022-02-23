const express = require("express");
const userRouter = require("./usersRouter");
const ingredientRouter = require("./ingredientsRouter");

const router = express.Router();

router.use("/user", userRouter);
router.use("/ingredients", ingredientRouter);

module.exports = router;
