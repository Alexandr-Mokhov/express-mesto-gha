const router = require('express').Router();
const { getUsers, getUsersById, createUsers } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/users', createUsers);

module.exports = router;
