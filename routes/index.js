const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { NOT_FOUND_ERROR } = require('../statusCodes');
const { createUser, login } = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/*', (req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Not Found' });
});

module.exports = router;
