const express = require('express');
const homePageAndSearchController = require('../../controllers/post/homePageAndSearchController');
const uploadPostController = require('../../controllers/post/uploadPostController');
const {
  followerListController,
  followingListController,
} = require('../../controllers/profile/followerAndFollowingList');
const profileUpdateController = require('../../controllers/profile/profileUpdateController');
const { uploadFileS3 } = require('../../midddleware/filesS3/uploadFileS3');

const router = express.Router();

router.get('/', homePageAndSearchController);
router.post('/updateprofile', uploadFileS3, profileUpdateController);
router.post('/uploadpost', uploadFileS3, uploadPostController);
router.get('/following', followingListController);
router.get('/followers', followerListController);

module.exports = router;
