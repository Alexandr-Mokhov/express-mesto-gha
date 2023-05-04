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
    _id: '64538154fcbcf9501015582a', // _id тестового пользователя
  };

  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => console.log('test'));
