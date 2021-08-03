/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch(() => res.status(500).send({ message: 'Ошибка сервера.' }));

const getUserById = (req, res) => User.findById(req.params.userId)
  .orFail(new Error('NotFound'))
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    if (err.name === 'Notfound') {
      res.status(404).send({ message: 'Пользователя нет в базе' });
    } else if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id ' });
    } else {
      res.status(500).send({ message: 'Ошибка сервера.' });
    }
  });

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch(() => {
      if (err.name === 'ValidationError') {
        res.status(404).send({ message: 'Невалидные данные.' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера.' });
      }
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  // User.findByIdAndUpdate(
  //   User.findById(req.params.userId),
  // { name: name, about: about },
  // { new: true }, // { runValidators: true }
  // )

  User.findById(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )

    .orFail(new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'Notfound') {
        res.status(404).send({ message: 'Пользователя нет в базе' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id ' });
      } else if (err.name === 'ValidationError') {
        res.status(404).send({ message: 'Невалидные данные.' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера.' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  // User.findByIdAndUpdate(req.user._id, { avatar: avatar }, { new: true })
  User.findById(req.user._id, { avatar }, { new: true, runValidators: true })

    .orFail(new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'Notfound') {
        res.status(404).send({ message: 'Пользователя нет в базе' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id ' });
      } else if (err.name === 'ValidationError') {
        res.status(404).send({ message: 'Невалидные данные.' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера.' });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
