const Post = require('../../models/Post');
const User = require('../../models/User');
const handleErrors = require('../utils/handleErrors');
const includesObjectId = require('../utils/includesObjectId');

module.exports = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne(
      { username },
      {
        usernameChangedTimestamp: 0,
        password: 0,
        emailVerifyCode: 0,
        emailVerifyType: 0,
        __v: 0,
      }
    ).exec();
    if (!user) return res.status(403).json('user is not registered.');

    const selfUser = await User.findOne({ email: req.userInfo.email }).exec();
    selfUser.following.push(selfUser._id);
    if (!includesObjectId(selfUser.following, user._id))
      return res
        .status(400)
        .json(`You need to follow '${username}' to view his post.`);

    const posts = await Post.find(
      { userID: user._id },
      {
        _id: 0,
        userID: 0,
        __v: 0,
      }
    ).exec();

    const { _id, ...userInfo } = user.toObject();
    res.status(200).json({ userInfo, posts });
  } catch (err) {
    const message = handleErrors(err);
    res.status(400).json({ message });
  }
};
