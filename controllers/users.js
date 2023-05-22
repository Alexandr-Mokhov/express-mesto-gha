const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const AuthorisationError = require('../errors/AuthorisationError');
const {
  OK_STATUS,
  CREATED_STATUS,
} = require('../statusCodes');

function findByIdUser(id, res, next) {
  userModel.findById(id)
    .orFail()
    .then((user) => res.status(OK_STATUS).send(user))
    .catch(next);
}

function updateUser(id, reqBody, res, next) {
  userModel.findByIdAndUpdate(id, reqBody, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(OK_STATUS).send(user))
    .catch(next);
}

const getUsers = (req, res, next) => {
  userModel.find({})
    .then((users) => res.status(OK_STATUS).send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  findByIdUser(req.params.userId, res, next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => userModel.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(CREATED_STATUS).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  updateUser(req.user._id, { name: req.body.name, about: req.body.about }, res, next);
};

const updateUserAvatar = (req, res, next) => {
  updateUser(req.user._id, { avatar: req.body.avatar }, res, next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  userModel.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorisationError('Неправильные почта или пароль.'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorisationError('Неправильные почта или пароль.'));
          }
          const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
          return res.send({ token });
        })
        .catch(next);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  findByIdUser(req.user._id, res, next);
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
