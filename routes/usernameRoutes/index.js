const express = require('express');
const userProfileController = require('../../controllers/profile/userProfileController');
const userPostController = require('../../controllers/profile/userPostController');
const {
  followUserController,
  unFollowUserController,
} = require('../../controllers/profile/followUnfollowUserController');

const router = express.Router({ mergeParams: true });

router.get('/', userProfileController);
router.get('/post', userPostController);
router.post('/follow', followUserController);
router.post('/unfollow', unFollowUserController);

module.exports = router;
