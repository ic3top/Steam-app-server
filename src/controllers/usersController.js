const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../services/usersService');

const {
  asyncWrapper,
} = require('../utils/apiUtils');

router.get('/', asyncWrapper(async (req, res) => {
  const users = await getAllUsers(req.url);

  res.json({ users });
}));


module.exports = { usersRouter: router };
