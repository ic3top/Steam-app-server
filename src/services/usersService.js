const { User } = require('../models/userModel');
const UNNECESSARY_FIELDS = {
  __v: false,
  email: false,
  password: false,
  games: false,
};

const getAllUsers = async () => {
  const users = await User.find({ 'userName': { $ne: 'admin' }}, UNNECESSARY_FIELDS)
      .populate('friends', UNNECESSARY_FIELDS)
      .populate('games');
  return users;
};

module.exports = { getAllUsers };
