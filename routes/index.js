const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { NOT_FOUND_ERROR } = require('../statusCodes');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { registrationValidation, loginValidation } = require('../utils/validation');

router.post('/signup', registrationValidation, createUser);
router.post('/signin', loginValidation, login);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('/*', (req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Not Found' });
});

module.exports = router;
