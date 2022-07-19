const jwt = require('jsonwebtoken');

function createAccessToken(payloadData) {
  const accessToken = jwt.sign(
    payloadData,
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXP_TIME,
    }
  );
  return accessToken;
}

module.exports = { createAccessToken };
