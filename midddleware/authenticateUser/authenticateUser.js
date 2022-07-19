const jwt = require('jsonwebtoken');
const handleErrors = require('../../controllers/utils/handleErrors');

module.exports = async (req, res, next) => {
  try {
    const { _auth_token } = req.cookie;
    if (!_auth_token) return res.status(403).json('you need to login first');
    const decoded = jwt.verify(
      _auth_token,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      (err) => {
        if (err) return res.status(403).json('cookie experied or tampered.');
      }
    );
    console.log(decoded);
    next();
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json({ message });
  }
};
