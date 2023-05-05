const userModel = require('../models/user');
const { BAD_REQUEST_ERROR, NOT_FOUND_ERROR, INTERNAL_SERVER_ERROR } = require('../errorCodes');

const getUsers = (req, res) => {
  userModel.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: err.message }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  userModel.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') { // по заданию это условие вроде как не нужно
        res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные при запросе профиля.' });
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь по указанному _id не найден.' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const data = req.body;
  if (!data.name || data.name.length < 2 || data.name.length > 30
    || !data.about || data.about.length < 2 || data.about.length > 30 || !data.avatar) {
    res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные при создании профиля.' });
    return;
  }
  userModel.create(data)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные при создании профиля.' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const updateUserInfo = (req, res) => {
  const { _id } = req.user;
  const dataUser = req.body;
  if (!dataUser.name || dataUser.name.length < 2 || dataUser.name.length > 30
    || !dataUser.about || dataUser.about.length < 2 || dataUser.about.length > 30) {
    res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
    return;
  }
  userModel.findByIdAndUpdate(_id, dataUser, { new: true })
    .orFail()
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь по указанному _id не найден.' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const updateUserAvatar = (req, res) => {
  const { _id } = req.user;
  const dataAvatar = req.body;
  userModel.findByIdAndUpdate(_id, dataAvatar, { new: true })
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь по указанному _id не найден.' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
