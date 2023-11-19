const winston = require('winston');

function prodlogger() {
  winston.createLogger({
    format: winston.format(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.errors(),
      winston.format.json()
    ),
    defaultMeta: { service: 'under-service' },
    transports: [new winston.transports.Console()],
  });
}

exports.module = prodlogger;
