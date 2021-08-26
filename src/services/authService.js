const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/userModel');

const register = async ({ email, password, userName, age }) => {
  const user = new User({
    email,
    password: await bcrypt.hash(password, 10),
    userName,
    age,
  });
  await user.save();
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({
    _id: user._id,
    email: user.email,
    userName: user.userName,
  }, 'secret', { expiresIn: '1d' });
  return token;
};

module.exports = {
  register,
  login,
};
