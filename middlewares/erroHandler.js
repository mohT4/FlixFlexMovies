const sendDevErr = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendProdErr = (err, res) => {
  if (err.isOperational)
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if ((process.env.NODE_ENV = 'production')) sendProdErr(err, res);
  if ((process.env.NODE_ENV = 'development')) sendDevErr(err, res);
};
