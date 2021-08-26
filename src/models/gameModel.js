const mongoose = require('mongoose');
const { GAME_GENRES } = require('../consts');

const Game = mongoose.model('Game', {
  title: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    enum: GAME_GENRES,
    required: true,
  },
  description: String,
  year: Number,
  rating: Number,

  addedAt: {
    type: Date,
    default: Date.now(),
  },

  img: String,
  alt: String,
});

module.exports = { Game };
