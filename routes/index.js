const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { NOT_FOUND_ERROR } = require('../statusCodes');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', createUser);
router.post('/signin', login);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('/*', (req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Not Found' });
});

module.exports = router;
