const Joi = require('joi');
const { GAME_GENRES } = require('../consts');

const registrationValidator = async (req, _, next) => {
  const schema = Joi.object({
    password: Joi.string()
        .min(4)
        .max(24)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    userName: Joi.string()
        .min(2)
        .max(24)
        .required(),
    age: Joi.number()
        .min(3)
        .max(100),
  });

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

const patchUserInfoValidator = async (req, _, next) => {
  const schema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    userName: Joi.string()
        .min(2)
        .max(24)
        .required(),
    age: Joi.number()
        .min(3)
        .max(100)
        .required(),
  });

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

const newGameValidator = async (req, _, next) => {
  const schema = Joi.object({
    title: Joi.string()
        .required(),
    price: Joi.number()
        .required(),
    genre: Joi.string()
        .valid(...GAME_GENRES)
        .required(),
    description: Joi.string(),
    year: Joi.number()
        .min(1980)
        .max(new Date().getFullYear()),
    rating: Joi.number()
        .min(0)
        .max(10),
  });

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

const friendIdValidator = async (req, _, next) => {
  try {
    await Joi.object({
      friendId: Joi.string()
          .required(),
    }).validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

const gameIdValidator = async (req, _, next) => {
  try {
    await Joi.object({
      gameId: Joi.string()
          .required(),
    }).validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registrationValidator,
  patchUserInfoValidator,
  newGameValidator,
  friendIdValidator,
  gameIdValidator,
};
