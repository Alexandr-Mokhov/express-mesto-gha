const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1/mestodb');
app.use((req, res, next) => {
  req.user = { _id: '6464ace0089171fb0eef0188' };
  next();
});

app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`Enabled port ${PORT}`));
