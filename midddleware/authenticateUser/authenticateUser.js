const jwt = require('jsonwebtoken');
const handleErrors = require('../../controllers/utils/handleErrors');

module.exports = async (req, res, next) => {
  try {
    const { _auth_token } = req.cookies;
    if (!_auth_token) return res.status(403).json('you need to login first');
    jwt.verify(
      _auth_token,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      (err, payload) => {
        if (err) return res.status(403).json('cookie experied or tampered.');
        if (!payload.emailVerified)
          return res.status(403).json('email is not verified');
        req.userInfo = payload;
      }
    );
    next();
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json({ message });
  }
};
