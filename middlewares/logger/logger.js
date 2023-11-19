const buildDevlogger = require('./devLogger');
const buildProdLogger = require('./prodLogger');

let logger;
if (process.env.NODE_ENV === 'development') {
  logger = buildDevlogger();
} else if (process.env.NODE_ENV === 'production') {
  logger = buildProdLogger();
}

module.exports = logger;
