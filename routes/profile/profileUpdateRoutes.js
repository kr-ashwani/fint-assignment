const express = require('express');
const homePageAndSearchController = require('../../controllers/post/homePageAndSearchController');
const uploadPostController = require('../../controllers/post/uploadPostController');
const {
  followUserController,
  unFollowUserController,
} = require('../../controllers/profile/followUnfollowUserController');
const profileUpdateController = require('../../controllers/profile/profileUpdateController');
const userPostController = require('../../controllers/profile/userPostController');
const userProfileController = require('../../controllers/profile/userProfileController');
const { uploadFileS3 } = require('../../midddleware/filesS3/uploadFileS3');

const router = express.Router();

router.get('/', homePageAndSearchController);
router.get('/:username', userProfileController);
router.get('/:username/post', userPostController);
router.post('/:username/follow', followUserController);
router.post('/:username/unfollow', unFollowUserController);
router.post('/updateprofile', uploadFileS3, profileUpdateController);
router.post('/uploadpost', uploadFileS3, uploadPostController);

module.exports = router;
