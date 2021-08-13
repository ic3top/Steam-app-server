const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../services/usersService');

const {
  asyncWrapper,
} = require('../utils/apiUtils');

router.get('/', asyncWrapper(async (_, res) => {
  const users = await getAllUsers();

  res.json({ users });
}));


module.exports = { usersRouter: router };
