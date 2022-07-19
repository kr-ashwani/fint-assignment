const User = require('../../models/User');
const handleErrors = require('../utils/handleErrors');
const { createAccessToken } = require('../utils/newJwtToken');

module.exports = async function (req, res) {
  try {
    const { email, code } = req.query;
    if (!(email && code)) throw new Error('email or code is missing');
    const user = await User.findOne({ email }).exec();
    if (!user) throw new Error('user is not registered');

    if (!user.emailVerifyCode)
      return req.status(403).json('link cannot be used more than once.');
    if (user.emailVerifyCode !== code)
      return req.status(403).json('link is tampered.');

    const payloadData = {
      name: user.name,
      email,
      emailVerified: true,
    };
    const accessToken = createAccessToken(payloadData);

    user.emailVerified = true;
    user.emailVerifyCode = '';
    await user.save();
    res.cookie('_auth_token', accessToken, {
      httpOnly: true,
      maxAge: process.env.ACCESS_TOKEN_EXP_TIME,
      sameSite: 'lax',
    });
    res.send('email is verified and jwt is sent as cookie.');
  } catch (err) {
    const message = handleErrors(err);
    res.status(403).json({ message });
  }
};
