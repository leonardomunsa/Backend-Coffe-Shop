const express = require("express");
const userRouter = require("./usersRouter");
const ingredientRouter = require("./ingredientsRouter");
const productRouter = require("./productsRouter");

const router = express.Router();

router.use("/user", userRouter);
router.use("/ingredients", ingredientRouter);
router.use("/products", productRouter);

module.exports = router;
