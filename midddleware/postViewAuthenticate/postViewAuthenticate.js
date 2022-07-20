const handleErrors = require('../../controllers/utils/handleErrors');
const Post = require('../../models/Post');
const User = require('../../models/User');

module.exports = async (req, res, next) => {
  try {
    const { postid } = req.params;
    if (!postid) return res.status(400).json('postid is missing.');

    const post = await Post.findOne({ _id: postid }).exec();
    if (!post)
      return res.status(400).json('There is no post with this postid.');

    const user = await User.findOne({ email: req.userInfo.email }).exec();

    user.following.push(user._id);
    if (!user.following.includes(post.userID)) {
      const postUser = await User.findOne({ _id: post.userID }).exec();
      return res
        .status(400)
        .json(`You need to follow '${postUser.username}' to view his post.`);
    }

    req.post = post.toObject();

    next();
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json(message);
  }
};
