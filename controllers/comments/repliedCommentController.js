const Comment = require('../../models/Comment');
const handleErrors = require('../utils/handleErrors');

const viewRepliedComment = async (req, res) => {
  try {
    const { commentid } = req.params;
    const comment = await Comment.findOne({ _id: commentid }).exec();
    const repliedComments = [];

    comment.repliedCommentID.forEach(async (elem) => {
      const com = await Comment.findOne(
        { _id: elem },
        {
          _id: 0,
          __v: 0,
          postID: 0,
          userID: 0,
        }
      ).exec();
      repliedComments.push(com);
    });

    await Promise.all(repliedComments);

    res.status(200).json({ repliedComments });
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json({ message });
  }
};

const replyToComment = async (req, res) => {
  try {
    const { postid, commentid } = req.params;
    const { comment } = req.body;
    if (!comment?.trim()?.length)
      return res.status(400).json('comment is missing');

    const repliedComment = await Comment.create({
      postID: postid,
      commentID: commentid,
      comment,
      repliedComment: true,
    });

    await Comment.findOneAndUpdate(
      { _id: commentid },
      { $push: { repliedCommentID: repliedComment._id } }
    );

    res.status(200).json('you successfully replied to a comment.');
  } catch (err) {
    const message = handleErrors(err);
    res.status(500).json({ message });
  }
};

module.exports = { viewRepliedComment, replyToComment };
