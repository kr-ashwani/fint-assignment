const handleErrors = require('../utils/handleErrors');

module.exports = async (req, res) => {
  try {
    const { name, username } = req.body;
    if (!(name || username || req.imageURL))
      return res
        .status(400)
        .json('name or file or username should be provided to update profile.');

    if (name) req.userInfo.name = name;
    if (req.imageURL) req.userInfo.photoUrl = req.imageURL;
    if (username) {
      if (
        Date.now() - req.userInfo.usernameChangedTimestamp <
        60 * 24 * 60 * 60 * 1000
      )
        return res
          .status(403)
          .json(
            `You can change username after ${Math.ceil(
              (req.userInfo.usernameChangedTimestamp +
                60 * 24 * 60 * 60 * 1000 -
                Date.now()) /
                (24 * 60 * 60 * 1000)
            )} days`
          );
      req.userInfo.username = username;
    }
    await req.userInfo.save();
    res.status(200).json('profile updated successfully.');
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json({ message });
  }
};
