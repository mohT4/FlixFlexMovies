const mongoose = require('mongoose');
const app = require('./app');
const logger = require('./middlewares/logger/logger');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => logger.info('DATABASE CONNECTED...'));

const port = process.env.PORT || 60000;
const server = app.listen(port, () => {
  logger.info(`listening on port ${port}`);
});

process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! SHUTTING DOWN...');
  logger.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! SHUTTING DOWN...');
  logger.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
module.exports = server;
