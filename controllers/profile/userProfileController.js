const User = require('../../models/User');
const handleErrors = require('../utils/handleErrors');

module.exports = async (req, res) => {
  try {
    const { username } = req.params;
    console.log(username);
    const user = await User.findOne(
      { username },
      {
        _id: 0,
        usernameChangedTimestamp: 0,
        password: 0,
        emailVerifyCode: 0,
        emailVerifyType: 0,
        __v: 0,
      }
    ).exec();
    if (!user) return res.status(403).json('user is not registered.');

    res.status(200).json({ userInfo: user.toObject() });
  } catch (err) {
    const message = handleErrors(err);
    res.status(400).json({ message });
  }
};
