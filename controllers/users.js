/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const User = require("../models/user");

const getUsers = (req, res) =>
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: `Ошибка сервера.` }));

const getUserById = (req, res) =>
  User.findById(req.params.id)
    .orFail(new Error("NotValidId"))
    .then((user) => res.status(200).send(user))
    .catch((err) => {

      if (err.message === "NotValidId") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else if (err.name === "Not found") {
        res.status(404).send({ message: "Пользователя нет в базе" });
      } else {
        res.status(500).send({ message: `Ошибка сервера.` });
      }
    });

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: `Ошибка сервера.` }));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name: name, about: about },
    { new: true }
  )
    .orFail(new Error("NotValidId"))
    .then((user) => res.status(200).send(user))
    .catch((err) => {

      if (err.message === "NotValidId") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else if (err.name === "Not found") {
        res.status(404).send({ message: "Пользователя нет в базе" });
      } else {
        res.status(500).send({ message: `Ошибка сервера.` });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar: avatar }, { new: true })

    .orFail(new Error("NotValidId"))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.log(err)
      if (err.message === "NotValidId") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else if (err.name === "Not found") {
        res.status(404).send({ message: "Пользователя нет в базе" });
      } else {
        res.status(500).send({ message: `Ошибка сервера.` });
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
