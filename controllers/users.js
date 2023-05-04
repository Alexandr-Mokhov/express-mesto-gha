const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Error getUsers' }));
};

const getUsersById = (req, res) => {
  const { id } = req.params;
  // console.log();
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User is not found' });
        return;
      }
      res.send(user);
    })
    .catch(() => res.status(500).send({ message: 'Error getUsersById' }));
};

const createUsers = (req, res) => {
  const data = req.body;
  // console.log(data);
  User.create(data)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch(() => res.status(500).send({ message: 'Error createUsers' }));
};

module.exports = {
  getUsers,
  getUsersById,
  createUsers,
};
