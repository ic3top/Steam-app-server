const url = require('url');
const { User } = require('../models/userModel');
const UNNECESSARY_FIELDS = {
  __v: false,
  email: false,
  password: false,
  games: false,
};

const getAllUsers = async (reqUrl) => {
  const { search } = url.parse(reqUrl, true).query;

  if (search) {
    const users = await User.find({
      userName: { $regex: new RegExp(search, 'i') },
    }, UNNECESSARY_FIELDS)
        .populate('friends', UNNECESSARY_FIELDS)
        .populate('games', UNNECESSARY_FIELDS);
    return users;
  }

  const users = await User.find({ userName: { $ne: 'admin' }}, UNNECESSARY_FIELDS)
      .populate('friends', UNNECESSARY_FIELDS)
      .populate('games', { __v: false });
  return users;
};

module.exports = { getAllUsers };
