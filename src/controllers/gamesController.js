const express = require('express');
const router = express.Router();

const { newGameValidator } = require('../middlewares/validationMidlleware');
const { getAllGames, addNewGame, getGameById } = require('../services/gamesService');
const { adminVerificationMiddleware } = require('../middlewares/adminVerificationMiddleware');

const {
  asyncWrapper,
} = require('../utils/apiUtils');

router.get('/', asyncWrapper(async (req, res) => {
  const games = await getAllGames(req.url);

  res.json({ games });
}));

router.get('/:gameId', asyncWrapper(async (req, res) => {
  const game = await getGameById(req.params.gameId);

  res.json({ game });
}));

router.post('/', adminVerificationMiddleware, newGameValidator, asyncWrapper(async (req, res) => {
  await addNewGame(req.body);

  res.json({ message: `${req.body.title} was added successfully` });
}));


module.exports = { gamesRouter: router };
