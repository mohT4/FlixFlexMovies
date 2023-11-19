const winston = require('winston');

function devLogger() {
  const formatLoger = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}:  ${message}`;
  });
  return winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:MM:SS' }),
      winston.format.errors({ stack: true }),
      formatLoger
    ),
    transports: [new winston.transports.Console()],
  });
}

module.exports = devLogger;
