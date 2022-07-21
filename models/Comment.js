const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    postID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'post id is missing.'],
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'user id is missing'],
    },
    comment: {
      type: String,
      trim: true,
      required: [true, 'comment is missing.'],
    },
    repliedCommentID: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    repliedComment: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment;
