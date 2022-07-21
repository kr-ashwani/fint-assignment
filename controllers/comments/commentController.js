const handleErrors = require('../utils/handleErrors');
const Comment = require('../../models/Comment');

const viewComment = async (req, res) => {
  try {
    const { postid } = req.params;

    const comments = await Comment.find(
      {
        postID: postid,
        repliedComment: false,
      },
      {
        _id: 0,
        __v: 0,
        postID: 0,
        userID: 0,
      }
    ).exec();

    res.status(200).json({ comments });
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json({ message });
  }
};

const postComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const { postid } = req.params;
    if (!comment?.trim()?.length)
      return res.status(400).json('comment is missing');

    await Comment.create({
      postID: postid,
      userID: req.userInfo._id,
      comment,
    });

    res.status(200).json('Your comment added on the post.');
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json({ message });
  }
};

module.exports = { viewComment, postComment };
