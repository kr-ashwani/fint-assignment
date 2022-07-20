const User = require('../../models/User');
const handleErrors = require('../utils/handleErrors');

module.exports = async (req, res) => {
  try {
    const { name, username } = req.body;
    if (!(name || username || req.imageURL))
      return res
        .status(400)
        .json('name or file or username should be provided to update profile.');
    const user = await User.findOne({ email: req.userInfo.email }).exec();

    if (!user) return res.status(403).json('user is not registered.');

    if (name) user.name = name;
    if (req.imageURL) user.photoUrl = req.imageURL;
    if (username) {
      if (Date.now() - user.usernameChangedTimestamp < 60 * 24 * 60 * 60 * 1000)
        return res
          .status(403)
          .json(
            `You can change username after ${Math.ceil(
              (user.usernameChangedTimestamp +
                60 * 24 * 60 * 60 * 1000 -
                Date.now()) /
                (24 * 60 * 60 * 1000)
            )} days`
          );
      user.username = username;
    }
    await user.save();
    res.status(200).json('profile updated successfully.');
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json({ message });
  }
};
