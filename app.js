
const express = require("express");
const helmet = require('helmet');
const mongoose = require("mongoose");

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards')

const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use((req, res, next) => {
  req.user = {
    _id: '6102ca6d5d45382ab85bbaf2'
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use("/*", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден." });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});


