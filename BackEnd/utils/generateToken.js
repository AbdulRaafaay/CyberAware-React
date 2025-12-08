const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'dev_secret_123';
  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// Generate Refresh Token
const generateRefreshToken = (id) => {
  const secret = process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret_123';
  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d',
  });
};

module.exports = {
  generateToken,
  generateRefreshToken,
};

