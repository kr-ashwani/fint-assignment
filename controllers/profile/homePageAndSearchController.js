const User = require('../../models/User');
const handleErrors = require('../utils/handleErrors');

module.exports = async (req, res) => {
  try {
    const { search } = req.query;
    if (search) {
      const str = '^search';
      const reg = new RegExp(str.replace('search', search));
      const usersArr = await User.find(
        {
          username: { $regex: reg, $options: 'i' },
        },
        {
          _id: 0,
          usernameChangedTimestamp: 0,
          password: 0,
          emailVerifyCode: 0,
          emailVerifyType: 0,
          following: 0,
          followers: 0,
          __v: 0,
        }
      ).exec();

      res.status(200).json({ usersArr });
    } else {
      res.send('Hello');
    }
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json({ message });
  }
};
