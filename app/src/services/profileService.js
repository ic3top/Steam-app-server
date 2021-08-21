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
      .populate('friendRequests games', { __v: false })
      .populate({ path: 'friendRequests', populate: {
        path: 'to from',
        select: { __v: false, friendRequests: false, password: false },
      }, select: { __v: false }});
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

  if (!age) {
    await User.findOneAndUpdate(
        { _id: userId },
        { $unset: { age: 1 }},
    );
  }

  return updatedUser;
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
  addNewGame,
  deleteGame,
};
