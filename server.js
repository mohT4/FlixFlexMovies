const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const logger = require('./middlewares/logger/logger');

dotenv.config();

process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! SHUTTING DOWN...');
  logger.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => logger.info('DATABASE CONNECTED...'));

const port = process.env.PORT || 6000;
const server = app.listen(port, () => {
  logger.info(`listening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! SHUTTING DOWN...');
  logger.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
