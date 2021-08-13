const express = require('express');
const router = express.Router();

const { newGameValidator } = require('../middlewares/validationMidlleware');
const { getAllGames, addNewGame } = require('../services/gamesService');
const { adminVerificationMiddleware } = require('../middlewares/adminVerificationMiddleware');

const {
  asyncWrapper,
} = require('../utils/apiUtils');

router.get('/', asyncWrapper(async (_, res) => {
  const games = await getAllGames();

  res.json({ games });
}));

router.post('/', adminVerificationMiddleware, newGameValidator, asyncWrapper(async (req, res) => {
  await addNewGame(req.body);

  res.json({ message: `${req.body.title} was added successfully` });
}));


module.exports = { gamesRouter: router };
