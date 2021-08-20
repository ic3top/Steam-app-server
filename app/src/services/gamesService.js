const url = require('url');
const { Game } = require('../models/gameModel');
const { GAME_GENRES } = require('../consts');

const getAllGames = async (reqUrl) => {
  const exceptFields = { __v: false };
  const { genres=GAME_GENRES, maxPrice=100, search } = url.parse(reqUrl, true).query;

  if (search) {
    const games = await Game.find({ $or: [
      {
        title: { $regex: new RegExp(search, 'i') },
        price: { $lt: maxPrice },
        genre: { $in: genres },
      },
    ]}, exceptFields);
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
