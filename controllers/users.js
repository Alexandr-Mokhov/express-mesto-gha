const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const { handleResponseError } = require('../utils/utils');
const {
  OK_STATUS,
  CREATED_STATUS,
} = require('../statusCodes');

const getUsers = (req, res) => {
  userModel.find({})
    .then((users) => res.status(OK_STATUS).send(users))
    .catch((err) => handleResponseError(err, res));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  userModel.findById(userId)
    .orFail()
    .then((user) => res.status(OK_STATUS).send(user))
    .catch((err) => handleResponseError(err, res));
};

const createUser = (req, res) => {
  // if (req.body.password.validate) { //почему пропускает пароль меньше 4х знаков
  bcrypt.hash(req.body.password, 10)
    .then((hash) => userModel.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(CREATED_STATUS).send(user))
    .catch((err) => handleResponseError(err, res));
  // }
};

const updateUserInfo = (req, res) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  userModel.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(OK_STATUS).send(user))
    .catch((err) => handleResponseError(err, res));
};

const updateUserAvatar = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  userModel.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(OK_STATUS).send(user))
    .catch((err) => handleResponseError(err, res));
};

const login = (req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
          return res.send({ token }); // передать через куки
        });
    })
    .catch((err) => res.status(401).send({ message: err.message }));
};

const getCurrentUser = (req, res) => {
  userModel.findById(req.user._id)
    .orFail()
    .then((user) => res.status(OK_STATUS).send(user))
    .catch((err) => handleResponseError(err, res));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getCurrentUser,
};

// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// eyJfaWQiOiI2NDY0YWNlMDA4OTE3MWZiMGVlZjAxODgiLCJpYXQiOjE2ODQzMzg2NzEsImV4cCI6MTY4NDk0MzQ3MX0.
// VDCqaqHhnfvTfNAZcmjyezL6Ll-kDpa1PafgTwhpE6E"
// }
