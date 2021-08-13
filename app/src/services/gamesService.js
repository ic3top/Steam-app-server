const { Game } = require('../models/gameModel');

const getAllGames = async () => {
  const games = await Game.find({}, { __v: false });

  return games;
};

const addNewGame = async (gameDescription) => {
  const newGame = new Game(gameDescription);

  await newGame.save();
};

module.exports = {
  getAllGames,
  addNewGame,
};
