const {
  BAD_REQUEST_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  CONFLICTING_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
} = require('../statusCodes');

function handleResponseError(err, res) {
  if (err.name === 'DocumentNotFoundError') {
    res.status(NOT_FOUND_ERROR).send({ message: 'Ресурс с указанным id не найден.' });
    return;
  }
  if (err.name === 'ValidationError' || err.name === 'CastError' || err.message === 'user validation failed: email: Некорректный email') {
    res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные.' });
    return;
  }
  if (err.message === 'FORBIDDEN_ERROR') {
    res.status(FORBIDDEN_ERROR).send({ message: 'Удаление карточки другого пользователя запрещено.' });
  }
  if (err.message === 'Authorization Required') {
    res.status(UNAUTHORIZED_ERROR).send({ message: 'Требуется авторизация.' });
    return;
  }
  if (err.message === 'Authorisation Error') {
    res.status(UNAUTHORIZED_ERROR).send({ message: 'Неправильные почта или пароль.' });
    return;
  }
  if (err.code === 11000) {
    res.status(CONFLICTING_REQUEST_ERROR).send({ message: 'Такой E-mail уже существует' });
  }
  res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка.' });
}

module.exports = { handleResponseError };
