const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  postImage: {
    type: String,
    required: [true, 'post image missing.'],
  },
  postDescription: {
    type: String,
    trim: true,
    default: '',
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'user id missing.'],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
});

const Post = mongoose.model('post', PostSchema);
module.exports = Post;
