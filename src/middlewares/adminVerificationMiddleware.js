const jwt = require('jsonwebtoken');

const adminVerificationMiddleware = (req, res, next) => {
  const {
    authorization,
  } = req.headers;
  if (!authorization) {
    return res
        .status(401)
        .json({ message: 'Please, provide "authorization" header' });
  }

  const [ , token ] = authorization.split(' ');

  if (!token) {
    return res.status(401).json({ message: 'Please, include token to request' });
  }

  try {
    const { userName } = jwt.verify(token, 'secret');

    if (userName !== 'admin') {
      throw new Error('You are not allowed to commit this action');
    }

    next();
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

module.exports = {
  adminVerificationMiddleware,
};
