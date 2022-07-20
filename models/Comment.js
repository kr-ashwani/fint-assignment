const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  postID: {
    type: String,
    required: [true, 'post id is missing.'],
  },
  userID: {
    type: String,
    required: [true, 'user id is missing'],
  },
  comment: {
    type: String,
    trim: true,
    required: [true, 'comment is missing.'],
  },
  repliedCommentID: {
    type: [String],
    default: [],
  },
  likes: {
    type: [String],
    default: [],
  },
});

const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment;
