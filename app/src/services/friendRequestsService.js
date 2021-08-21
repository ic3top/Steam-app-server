const { FriendRequest } = require('../models/friendRequestModel');
const { User } = require('../models/userModel');

const addToFriendRequests = async (userId, requestId) => {
  await User.update({ _id: userId }, { $push: { friendRequests: requestId }});
};

const addToFriend = async (userId, friendId) => {
  await User.update({ _id: userId }, { $push: { friends: friendId }});
};

const deleteRequest = async (userId, requestId) => {
  await User.updateOne(
      { _id: userId },
      { $pull: { friendRequests: requestId }},
  );
};

const createNewRequest = async (from, to) => {
  const sameFR = await FriendRequest.findOne({ from, to });

  if (sameFR) {
    throw new Error('Duplicated request');
  }
  const FR = new FriendRequest({ from, to });
  await addToFriendRequests(from, FR._id);
  await addToFriendRequests(to, FR._id);
  await FR.save();
};

const acceptRequest = async (requestId, accepterId) => {
  const FR = await FriendRequest.findOne({ _id: requestId });

  if (!FR) {
    throw new Error('There is no request with provided id found');
  }

  if (FR.to != accepterId) {
    throw new Error('You can`t accept this request');
  }

  await FriendRequest.findOneAndDelete({ _id: requestId });
  await deleteRequest(FR.from, FR._id);
  await deleteRequest(FR.to, FR._id);
  await addToFriend(FR.from, FR.to);
  await addToFriend(FR.to, FR.from);
};

const declineRequest = async (requestId, userId) => {
  const FR = await FriendRequest.findOne({ _id: requestId });

  if (!FR) {
    throw new Error('There is no request with provided id found');
  }

  if (FR.to != userId && FR.from != userId) {
    throw new Error('You can`t decline this request');
  }

  await FriendRequest.findOneAndDelete({ _id: requestId });
  await deleteRequest(FR.from, FR._id);
  await deleteRequest(FR.to, FR._id);
};

module.exports = {
  createNewRequest,
  acceptRequest,
  declineRequest,
};
