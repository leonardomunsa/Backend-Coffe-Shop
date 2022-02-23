/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// função para lidar com erros
module.exports = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  console.log(err);
  return res.status(500).json({ message: "Internal Server Error" });
};
