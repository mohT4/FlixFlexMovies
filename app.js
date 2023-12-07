const express = require('express');
const dotenv = require('dotenv');

const AppError = require('./utils/AppError');
const globallErrorHandler = require('./middlewares/erroHandler');
const httplogger = require('./middlewares/logger/httpLogger');
const logger = require('./middlewares/logger/logger');
const path = require('path');
const userRouter = require('./routes/userRouter');
const moviesRouter = require('./routes/moviesRouter');
const tvShowesRouter = require('./routes/tvShowesRouter');

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: path.join(__dirname, envFile) });
const app = express();

//global middlwares

//body parser, reding data from body
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//devolepment loggin
app.use(httplogger);
logger.info(process.env.NODE_ENV);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/tvshows', tvShowesRouter);
app.get('/', (req, res) => {
  res.status(200).render('./public/index.html');
});

app.use('*', (req, res, next) => {
  next(new AppError(400, `can't find ${req.originalUrl}`));
});
app.use(globallErrorHandler);

module.exports = app;
