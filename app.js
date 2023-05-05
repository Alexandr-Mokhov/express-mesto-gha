const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1/mestodb');
app.use((req, res, next) => {
  req.user = {
    _id: '64548ac4e301e7279021e38d', // _id тестового пользователя
  };

  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(router);

app.listen(PORT/* , () => console.log(`App listening on port ${PORT}`) */);
