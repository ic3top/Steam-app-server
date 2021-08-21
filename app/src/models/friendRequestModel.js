const mongoose = require('mongoose');

const FriendRequest = mongoose.model('FriendRequest', {
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  addedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = { FriendRequest };
