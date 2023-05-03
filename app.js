const express = require('express');
const mongoose = require('mongoose');
// const path = require('path');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
// app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.log('test'));
