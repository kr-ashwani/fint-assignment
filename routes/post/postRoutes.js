const express = require('express');
const {
  viewComment,
  postComment,
} = require('../../controllers/comments/commentController');
const {
  viewRepliedComment,
  replyToComment,
} = require('../../controllers/comments/repliedCommentController');
const {
  viewPostController,
  likePostController,
  unLikePostController,
} = require('../../controllers/post/viewlikeUnlikePostController');

const router = express.Router({ mergeParams: true });

router.get('/', viewPostController);
router.post('/like', likePostController);
router.post('/unlike', unLikePostController);
router.route('/comment').get(viewComment).post(postComment);
router
  .route('/comment/:commentid/reply')
  .get(viewRepliedComment)
  .post(replyToComment);

module.exports = router;
