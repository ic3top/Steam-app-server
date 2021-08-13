const express = require('express');
const router = express.Router();

const { InvalidRequestError } = require('../utils/errors');
const {
  patchUserInfoValidator,
  gameIdValidator,
  friendIdValidator,
} = require('../middlewares/validationMidlleware');
const {
  getUserById,
  deleteUserById,
  changeUserInfo,
  addNewFriend,
  addNewGame,
  deleteFriend,
  deleteGame,
} = require('../services/profileService');
const {
  asyncWrapper,
} = require('../utils/apiUtils');

router.get('/me', asyncWrapper(async (req, res) => {
  const { userId } = req.user;

  const user = await getUserById(userId);

  if (!user) {
    throw new InvalidRequestError('No user was found!');
  }

  res.json({ user });
}));

router.delete('/me', asyncWrapper(async (req, res) => {
  const { userId } = req.user;

  const deletedUser = await deleteUserById(userId);

  if (!deletedUser) {
    throw new InvalidRequestError('No user with such id found!');
  }

  res.json({ message: 'Profile deleted successfully' });
}));

router.patch('/me', patchUserInfoValidator, asyncWrapper(async (req, res) => {
  const { userName, email, age } = req.body;
  const { userId } = req.user;

  await changeUserInfo({ userId, userName, email, age });

  res.json({ message: 'User info was changed successfully' });
}));

router.patch('/me/friends', friendIdValidator, asyncWrapper(async (req, res) => {
  const { friendId } = req.body;
  const { userId } = req.user;

  await addNewFriend(userId, friendId);

  res.json({ message: 'Friend was added successfully' });
}));

router.delete('/me/friends', friendIdValidator, asyncWrapper(async (req, res) => {
  const { friendId } = req.body;
  const { userId } = req.user;

  await deleteFriend(userId, friendId);

  res.json({ message: 'Friend was deleted successfully' });
}));

router.patch('/me/games', gameIdValidator, asyncWrapper(async (req, res) => {
  const { gameId } = req.body;
  const { userId } = req.user;

  await addNewGame(userId, gameId);

  res.json({ message: 'Game was added successfully' });
}));

router.delete('/me/games', gameIdValidator, asyncWrapper(async (req, res) => {
  const { gameId } = req.body;
  const { userId } = req.user;

  await deleteGame(userId, gameId);

  res.json({ message: 'Game was deleted successfully' });
}));

module.exports = { profileRouter: router };
