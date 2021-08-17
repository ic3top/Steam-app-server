const url = require('url');
const { Game } = require('../models/gameModel');

const getAllGames = async (reqUrl) => {
  // TODO: refactor this shit
  const exceptFields = { __v: false };
  const { genres, maxPrice, search } = url.parse(reqUrl, true).query;
  if (search) {
    const games = await Game.find({ $or: [
      { title: { $regex: search }},
      { description: { $regex: search }},
    ]}, exceptFields);
    return games;
  }

  if (!genres && !maxPrice) {
    const games = await Game.find({}, exceptFields);

    return games;
  }

  if (!maxPrice) {
    const games = await Game.find({ genre: { $in: genres }}, exceptFields);

    return games;
  }

  if (!genres) {
    const games = await Game.find({ price: { $lt: maxPrice }}, exceptFields);

    return games;
  }

  const games = await Game.find({
    genre: { $in: genres },
    price: { $lt: maxPrice },
  }, exceptFields);

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
