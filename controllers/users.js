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
  const data = req.body;
  userModel.create(data)
    .then((user) => res.status(CREATED_STATUS).send(user))
    .catch((err) => handleResponseError(err, res));
};

const updateUserInfo = (req, res) => {
  const { _id } = req.user;
  const dataUser = req.body;
  userModel.findByIdAndUpdate(_id, dataUser, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(OK_STATUS).send(user))
    .catch((err) => handleResponseError(err, res));
};

const updateUserAvatar = (req, res) => {
  const { _id } = req.user;
  const dataAvatar = req.body;
  userModel.findByIdAndUpdate(_id, dataAvatar, { new: true, runValidators: true })
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
};
