const User = require('../../models/User');
const handleErrors = require('../utils/handleErrors');

module.exports = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).exec();
    const selfUser = await User.findOne({ email: req.userInfo.email }).exec();

    if (!(user && selfUser))
      return res.status(403).json('user is not registered.');

    if (user.email === selfUser.email)
      return res.status(403).json('You can follow others but not yourselves.');

    if (selfUser.following.includes(user._id))
      return res.status(403).json(`You already follow ${username}.`);

    await User.findOneAndUpdate(
      { email: req.userInfo.email },
      { $push: { following: user._id } }
    ).exec();

    await User.findOneAndUpdate(
      { username },
      { $push: { followers: selfUser._id } }
    ).exec();

    return res.status(200).json(`You followed ${username}.`);
  } catch (err) {
    const message = handleErrors(err);
    res.status(400).json({ message });
  }
};
