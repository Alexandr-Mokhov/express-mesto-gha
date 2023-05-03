const user = require('../models/user');

const getUsers = (req, res) => {
  user.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: 'Error' }));
};

const getUsersById = (req, res) => {
  const { id } = req.params;
  user.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User is not found' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => res.status(500).send({ message: 'Error' }));
};

const postUsers = (req, res) => {
  const data = req.body;
  user.create(data)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => res.status(500).send({ message: 'Error' }));
};

module.exports = {
  getUsers,
  getUsersById,
  postUsers,
};
