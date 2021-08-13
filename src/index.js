const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const PORT = 8080;
const app = express();
app.use(cors());

const { authRouter } = require('./controllers/authController');
const { profileRouter } = require('./controllers/profileController');
const { usersRouter } = require('./controllers/usersController');
const { gamesRouter } = require('./controllers/gamesController');

const { authMiddleware } = require('./middlewares/authMiddleware');
const { NodeCourseError } = require('./utils/errors');

app.use(express.json());
app.use(morgan('dev'));

app.use('/steam/auth', authRouter);
app.use('/steam/profile', [ authMiddleware ], profileRouter);
app.use('/steam/users', usersRouter);
app.use('/steam/games', gamesRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  if (err instanceof NodeCourseError) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
});

const start = async (PORT) => {
  try {
    // eslint-disable-next-line max-len
    await mongoose.connect('mongodb+srv://test:dvdvdv88@cluster0.orahy.mongodb.net/TEST?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    app.listen(PORT);
  } catch (err) {
    console.error(`Error on server startup: ${err.message}`);
  }
};

start(PORT);