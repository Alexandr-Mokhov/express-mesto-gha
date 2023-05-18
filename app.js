const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use(express.json());
app.use(router);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Enabled port ${PORT}`));
