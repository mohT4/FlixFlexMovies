const express = require('express');
const dotenv = require('dotenv');

const AppError = require('./utils/AppError');
const globallErrorHandler = require('./middlewares/erroHandler');
const httplogger = require('./middlewares/logger/httpLogger');
const logger = require('./middlewares/logger/logger');

const userRouter = require('./routes/userRouter');
const moviesRouter = require('./routes/moviesRouter');
const tvShowesRouter = require('./routes/tvShowesRouter');

dotenv.config();
const app = express();

//global middlwares

//body parser, reding data from body
app.use(express.json());

//devolepment loggin
app.use(httplogger);
logger.info(process.env.NODE_ENV);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/tvshows', tvShowesRouter);
app.use('/', (req, res) => {
  res.status(200).send('./index.html');
});

app.use('*', (req, res, next) => {
  next(new AppError(400, `can't find ${req.originalUrl}`));
});
app.use(globallErrorHandler);

module.exports = app;
