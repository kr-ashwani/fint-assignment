const bcrypt = require('bcrypt');
const handleErrors = require('../utils/handleErrors');
const User = require('../../models/User');
const { createAccessToken } = require('../utils/newJwtToken');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password))
      return res.status(400).json(' email or password is missing ');

    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(403).json('user is not registered.');

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) return res.status(403).json('password did not match.');

    const payloadData = {
      name: user.name,
      email,
      username: user.username,
      emailVerified: user.emailVerified,
    };
    const accessToken = createAccessToken(payloadData);

    res.cookie('_auth_token', accessToken, {
      httpOnly: true,
      maxAge: process.env.ACCESS_TOKEN_EXP_TIME,
      sameSite: 'lax',
    });

    res.status(200).json('logged in successfully and jwt is sent as cookie.');
  } catch (err) {
    const message = handleErrors(err);
    res.status(403).json({ message });
  }
};
