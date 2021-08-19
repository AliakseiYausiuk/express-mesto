const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 400;
  const message = statusCode === 400 ? 'Произошла ошибка валидации' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
