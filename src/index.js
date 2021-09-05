require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

const { authRouter } = require('./controllers/authController');
const { profileRouter } = require('./controllers/profileController');
const { usersRouter } = require('./controllers/usersController');
const { gamesRouter } = require('./controllers/gamesController');
const { friendRequestsRouter } = require('./controllers/friendRequestController');

const { authMiddleware } = require('./middlewares/authMiddleware');
const { NodeError } = require('./utils/errors');

app.use(cors({
  origin: process.env.DOMAIN,
  methods: [ 'GET', 'POST', 'PATCH', 'PUT', 'DELETE' ],
  optionsSuccessStatus: 200,
}));
app.use(express.json());
app.use(morgan('dev'));

app.use('/steam/auth', authRouter);
app.use('/steam/profile', [ authMiddleware ], profileRouter);
app.use('/steam/users', usersRouter);
app.use('/steam/games', gamesRouter);
app.use('/steam/friends', [ authMiddleware ], friendRequestsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res) => {
  if (err instanceof NodeError) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
});

const start = async (PORT) => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    app.listen(PORT);
  } catch (err) {
    console.error(`Error on server startup: ${err.message}`);
  }
};

start(process.env.PORT);
