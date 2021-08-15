const url = require('url');
const { Game } = require('../models/gameModel');

const getAllGames = async (reqUrl) => {
  // TODO: refactor this shit
  const { genres, maxPrice } = url.parse(reqUrl, true).query;
  if (!genres && !maxPrice) {
    const games = await Game.find({}, { __v: false });

    return games;
  }

  if (!maxPrice) {
    const games = await Game.find({ genre: { $in: genres }}, { __v: false });

    return games;
  }

  if (!genres) {
    const games = await Game.find({ price: { $lt: maxPrice }}, { __v: false });

    return games;
  }

  const games = await Game.find({
    genre: { $in: genres },
    price: { $lt: maxPrice },
  }, { __v: false });

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
