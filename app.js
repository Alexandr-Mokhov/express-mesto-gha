const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { handleResponseError } = require('./utils/handleResponseError');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use(express.json());
app.use(router);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  handleResponseError(err, res);
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Enabled port ${PORT}`));
