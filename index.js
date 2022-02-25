/* eslint-disable no-console */
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(router);

// middleware para tratamento de erros
app.use(errorHandler);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
