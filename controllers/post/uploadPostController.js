const Post = require('../../models/Post');
const User = require('../../models/User');
const handleErrors = require('../utils/handleErrors');

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.userInfo.email }).exec();
    if (!user) return res.status(403).json('user is not registered.');
    const { description } = req.body;

    await Post.create({
      postImage: req.imageURL,
      postDescription: description || '',
      userID: user._id,
    });

    res.status(200).json('post created successfully.');
  } catch (err) {
    const message = handleErrors(err);
    res.status(400).json(message);
  }
};
