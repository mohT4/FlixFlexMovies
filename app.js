const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AppError = require('./utils/AppError');
const globallErrorHandler = require('./middlewares/erroHandler');

dotenv.config();
const app = express();

//global middlwares

app.use(express.json());

app.use('*', (req, res, next) => {
  next(new AppError(400, `can't find ${req.originalUrl}`));
});
app.use(globallErrorHandler);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('DATABASE CONNECTED...'));

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
