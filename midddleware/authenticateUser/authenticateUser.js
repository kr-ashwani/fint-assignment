const jwt = require('jsonwebtoken');
const handleErrors = require('../../controllers/utils/handleErrors');
const User = require('../../models/User');

module.exports = async (req, res, next) => {
  try {
    const { _auth_token } = req.cookies;
    if (!_auth_token) return res.status(403).json('you need to login first');
    jwt.verify(
      _auth_token,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      async (err, payload) => {
        if (err) return res.status(403).json('cookie experied or tampered.');
        const user = await User.findOne(
          { email: payload.email },
          {
            usernameChangedTimestamp: 0,
            password: 0,
            emailVerifyCode: 0,
            emailVerifyType: 0,
            __v: 0,
          }
        ).exec();
        if (!user) return res.status(403).json('user is not registered.');
        if (!user.emailVerified)
          return res.status(403).json('email is not verified.');
        req.userInfo = user.toObject();
        next();
      }
    );
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json({ message });
  }
};
