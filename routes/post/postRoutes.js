const express = require('express');
const {
  viewPostController,
  likePostController,
  unLikePostController,
} = require('../../controllers/post/viewlikeUnlikePostController');

const router = express.Router();

router.get('/', viewPostController);
router.post('/like', likePostController);
router.post('/unlike', unLikePostController);
router.post('/comment');
router.post('/comment/:commentid/reply');

module.exports = router;
