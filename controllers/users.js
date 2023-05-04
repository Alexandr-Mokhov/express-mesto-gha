const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Error getUsers' }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User is not found' });
        return;
      }
      res.send(user);
    })
    .catch(() => res.status(500).send({ message: 'Error getUsersById' }));
};

const createUser = (req, res) => {
  const data = req.body;

  User.create(data)
    .then((user) => res.status(201).send(user))
    .catch(() => res.status(500).send({ message: 'Error createUsers' }));
};

const updateUserInfo = (req, res) => {
  const { _id } = req.user;
  const dataUser = req.body;

  User.findByIdAndUpdate(_id, dataUser, { new: true })
    .then((user) => res.status(201).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Error updateUserInfo' }));
};

const updateUserAvatar = (req, res) => {
  const { _id } = req.user;
  const dataAvatar = req.body;

  User.findByIdAndUpdate(_id, dataAvatar, { new: true })
    .then((user) => res.status(201).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Error updateUserAvatar' }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
