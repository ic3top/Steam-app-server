const express = require('express');
const router = express.Router();

const {
  createNewRequest,
  acceptRequest,
  declineRequest,
  deleteFriend,
} = require('../services/friendRequestsService');
const { strValueRequired } = require('../middlewares/validationMidlleware');
const {
  asyncWrapper,
} = require('../utils/apiUtils');

router.post('/', strValueRequired('to'), asyncWrapper(async (req, res) => {
  const { userId } = req.user;
  const { to } = req.body;

  await createNewRequest(userId, to);

  res.json({ message: 'New friend request created successfully' });
}));

router.delete('/', strValueRequired('friendId'), asyncWrapper(async (req, res) => {
  const { friendId } = req.body;
  const { userId } = req.user;

  await deleteFriend(userId, friendId);

  res.json({ message: 'Friend was deleted successfully' });
}));

router.patch('/accept', strValueRequired('requestId'), asyncWrapper(async (req, res) => {
  const { userId } = req.user;
  const { requestId } = req.body;

  await acceptRequest(requestId, userId);

  res.json({ message: 'New friend request accepted' });
}));

router.delete('/decline', strValueRequired('requestId'), asyncWrapper(async (req, res) => {
  const { userId } = req.user;
  const { requestId } = req.body;

  await declineRequest(requestId, userId);

  res.json({ message: 'New friend request declined' });
}));


module.exports = { friendRequestsRouter: router };
