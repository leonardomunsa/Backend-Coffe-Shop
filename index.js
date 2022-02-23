/* eslint-disable no-console */
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(bodyParser.json());

app.use(router);

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
