const Post = require('../../models/Post');
const User = require('../../models/User');
const handleErrors = require('../utils/handleErrors');
const includesObjectId = require('../utils/includesObjectId');

const viewPostController = async (req, res) => {
  try {
    const { _id, __v, ...post } = req.post;

    res.status(200).json({ post });
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json({ message });
  }
};

const likePostController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.userInfo.email }).exec();
    if (!user) return res.status(403).json('user is not registered.');

    if (includesObjectId(req.post.likes, user._id))
      return res.status(400).json('You have already liked the post.');

    await Post.findOneAndUpdate(
      { _id: req.post._id },
      { $push: { likes: user._id } }
    ).exec();

    res.status(200).json('You liked the post.');
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json({ message });
  }
};

const unLikePostController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.userInfo.email }).exec();

    if (!user) return res.status(403).json('user is not registered.');

    if (!includesObjectId(req.post.likes, user._id))
      return res.status(400).json('You have not liked the post.');

    await Post.findOneAndUpdate(
      { _id: req.post._id },
      { $pull: { likes: user._id } },
      { new: true }
    );

    res.status(200).json('Your like is removed.');
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json({ message });
  }
};

module.exports = {
  viewPostController,
  likePostController,
  unLikePostController,
};
