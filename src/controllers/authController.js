const express = require('express');
const router = express.Router();

const {
  register,
  login,
} = require('../services/authService');

const { asyncWrapper } = require('../utils/apiUtils');

const { registrationValidator } = require('../middlewares/validationMidlleware');

router.post(
    '/register',
    registrationValidator,
    asyncWrapper(async (req, res) => {
      const {
        email,
        password,
        userName,
        age,
      } = req.body;
      await register({ email, password, userName, age });

      res.json({ message: 'Profile created successfully' });
    }),
);

router.post('/login', asyncWrapper(async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  const token = await login({ email, password });
  const tommorow = new Date(new Date().getTime() + 60 * 60 * 24 * 1000);

  res.json({
    jwt_token: token,
    expires_at: tommorow,
  });
}));

module.exports = {
  authRouter: router,
};
