const User = require('../../models/User');
const handleErrors = require('../utils/handleErrors');

module.exports = async (req, res) => {
  try {
    const { name } = req.body;
    if (!(name || req.imageURL))
      return res
        .status(200)
        .json('name or file should be provided to update profile.');
    const user = await User.findOne({ email: req.userInfo.email }).exec();

    if (!user) return res.status(403).json('user is not registered.');

    if (name) user.name = name;
    if (req.imageURL) user.photoUrl = req.imageURL;
    await user.save();
    res.status(200).json('profile update.');
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json({ message });
  }
};
