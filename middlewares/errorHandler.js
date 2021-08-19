const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 400;
  const message = statusCode === 400 ? 'Произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
