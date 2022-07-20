const express = require('express');
const uploadPostController = require('../../controllers/post/uploadPostController');
const {
  viewPostController,
  likePostController,
  unLikePostController,
} = require('../../controllers/post/viewlikeUnlikePostController');
const { uploadFileS3 } = require('../../midddleware/filesS3/uploadFileS3');

const router = express.Router();

router.post('/uploadpost', uploadFileS3, uploadPostController);
router.get('/post/:postid', viewPostController);
router.post('/post/:postid/like', likePostController);
router.post('/post/:postid/unlike', unLikePostController);
router.post('/post/:postid/comment');
router.post('/post/:postid/comment/:commentid/reply');

module.exports = router;
