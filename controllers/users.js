const userModel = require('../models/user');
const {
  OK_STATUS,
  CREATED_STATUS,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
} = require('../statusCodes');

const getUsers = (req, res) => {
  userModel.find({})
    .then((users) => res.status(OK_STATUS).send(users))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка.' }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  userModel.findById(userId)
    .orFail()
    .then((user) => res.status(OK_STATUS).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные при запросе профиля.' });
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь по указанному _id не найден.' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка.' });
    });
};

const createUser = (req, res) => {
  const data = req.body;
  userModel.create(data)
    .then((user) => res.status(CREATED_STATUS).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные при создании профиля.' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка.' });
    });
};

const updateUserInfo = (req, res) => {
  const { _id } = req.user;
  const dataUser = req.body;
  userModel.findByIdAndUpdate(_id, dataUser, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(OK_STATUS).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь по указанному _id не найден.' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка.' });
    });
};

const updateUserAvatar = (req, res) => {
  const { _id } = req.user;
  const dataAvatar = req.body;
  userModel.findByIdAndUpdate(_id, dataAvatar, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(OK_STATUS).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь по указанному _id не найден.' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка.' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
