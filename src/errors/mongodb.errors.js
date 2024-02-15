const notFoundError = (res) => {
  return res
    .status(404)
    .send("Este dado não foi encontrado no banco de dados.");
};

const objectIdCastError = (res) => {
  return res
    .status(500)
    .send("Occoreu um erro ao recuperar esse dado nos banco de dados.");
};

module.exports = {
  notFoundError,
  objectIdCastError,
};
