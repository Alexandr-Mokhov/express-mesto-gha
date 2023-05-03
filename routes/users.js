const router = require('express').Router();

const { getUsers, getUsersById, postUsers } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/users/', postUsers);

module.exports = router;
