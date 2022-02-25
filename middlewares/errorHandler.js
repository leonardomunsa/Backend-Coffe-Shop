/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

// middleware para lidar com erros que surgem em alguma função ao longo da aplicação
module.exports = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  console.log(err);
  return res.status(500).json({ message: "Internal Server Error" });
};
