const logger = require('./logger');

module.exports = (req, res, next) => {
  res.on('finish', () => {
    const { statusCode } = res;
    const logLevel = statusCode >= 500 ? 'error' : 'info';

    logger[logLevel](`${req.method} ${req.originalUrl} - ${res.statusCode}`);
  });

  next();
};
