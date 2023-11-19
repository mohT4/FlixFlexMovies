const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const AppError = require('./utils/AppError');
const globallErrorHandler = require('./middlewares/erroHandler');
const httplogger = require('./middlewares/logger/httpLogger');
const logger = require('./middlewares/logger/logger');

const userRouter = require('./routes/userRouter');
const moviesRouter = require('./routes/moviesRouter');
const seriesRouter = require('./routes/seriesRouter');

dotenv.config();
const app = express();

//global middlwares

app.use(express.json());
app.use(httplogger);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/series', seriesRouter);

app.use('*', (req, res, next) => {
  next(new AppError(400, `can't find ${req.originalUrl}`));
});
app.use(globallErrorHandler);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => logger.info('DATABASE CONNECTED...'));

const port = process.env.PORT || 6000;
app.listen(port, () => {
  logger.info(`listening on port ${port}`);
});
