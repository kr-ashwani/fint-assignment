const Post = require('../../models/Post');
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
      const user = await User.findOne({ email: req.userInfo.email }).exec();
      if (!user) return res.status(403).json('user is not registered.');
      const followersAndUserItself = [...user.following, user._id];
      const posts = await Post.find(
        {
          userID: { $in: followersAndUserItself },
        },
        {
          _id: 0,
          __v: 0,
        }
      )
        .sort({ createdAt: -1 })
        .exec();

      res.status(200).json({ posts });
    }
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json({ message });
  }
};
