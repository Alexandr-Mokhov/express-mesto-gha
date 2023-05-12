const {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
} = require('../statusCodes');

function handleResponseError(err, res) {
  if (err.name === 'DocumentNotFoundError') {
    res.status(NOT_FOUND_ERROR).send({ message: 'Ресурс с указанным id не найден.' });
    return;
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные.' });
    return;
  }
  res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка.' });
}

module.exports = { handleResponseError };
