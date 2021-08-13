const { User } = require('../models/userModel');
const { InvalidRequestError } = require('../utils/errors');

const getUserById = async (userId) => {
  const userInfo = await User.findOne(
      { _id: userId },
      { __v: false, password: false },
  )
      .populate('friends', {
        __v: false,
        email: false,
        password: false,
        games: false,
      })
      .populate('games', { __v: false });
  return userInfo;
};

const deleteUserById = async (userId) => {
  const deletedUser = await User.findOneAndDelete({ _id: userId });
  return deletedUser;
};

const changeUserInfo = async ({ userId, email, age, userName }) => {
  const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { email, age, userName },
  );

  if (!updatedUser) {
    throw new InvalidRequestError('No user was found');
  }

  return updatedUser;
};

const addNewFriend = async (userId, friendId) => {
  await User.updateOne(
      { _id: userId },
      { $addToSet: { friends: friendId }},
  );
};

const deleteFriend = async (userId, friendId) => {
  await User.updateOne(
      { _id: userId },
      { $pull: { friends: friendId }},
  );
};

const addNewGame = async (userId, gameId) => {
  await User.updateOne(
      { _id: userId },
      { $addToSet: { games: gameId }},
  );
};

const deleteGame = async (userId, gameId) => {
  await User.updateOne(
      { _id: userId },
      { $pull: { games: gameId }},
  );
};

module.exports = {
  getUserById,
  deleteUserById,
  changeUserInfo,
  addNewFriend,
  addNewGame,
  deleteFriend,
  deleteGame,
};
