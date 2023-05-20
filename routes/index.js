const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { registrationValidation, loginValidation } = require('../utils/validation');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', registrationValidation, createUser);
router.post('/signin', loginValidation, login);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('/*', (req, res, next) => next(new NotFoundError('Страница не найдена.')));

module.exports = router;
