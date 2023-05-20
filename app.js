const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const router = require('./routes/index');
const NotFoundError = require('./errors/NotFoundError');
const BadRequestError = require('./errors/BadRequestError');
const config = require('./config');

const app = express();
const limiter = rateLimit(
  {
    windowMs: 10 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  },
);

mongoose.connect(config.mongodbLink);

app.use(limiter);
app.use(express.json());
app.use(router);
app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  let error = err;

  if (err.name === 'DocumentNotFoundError') {
    error = new NotFoundError('Ресурс с указанным id не найден.');
  }
  // я так понимаю это условие уже не нужно? вроде как Joi обрабатывает все подобные ошибки
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    error = new BadRequestError('Переданы некорректные данные.');
  }

  // на счет instanceof, мне кажется код ниже более универсальный, или я не правильно понял?
  const { statusCode = 500, message } = error;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

// eslint-disable-next-line no-console
app.listen(config.port, () => console.log(`Enabled port ${config.port}`));
