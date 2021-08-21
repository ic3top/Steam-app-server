const mongoose = require('mongoose');

const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
    unique: true,
  },

  age: {
    type: Number,
  },

  friends: {
    type: [ mongoose.Schema.Types.ObjectId ],
    ref: 'User',
    default: [],
  },

  games: {
    type: [ mongoose.Schema.Types.ObjectId ],
    ref: 'Game',
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  friendRequests: {
    type: [ mongoose.Schema.Types.ObjectId ],
    ref: 'FriendRequest',
    default: [],
  },
});

module.exports = { User };
