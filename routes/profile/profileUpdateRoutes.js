const express = require('express');
const homePageAndSearchController = require('../../controllers/post/homePageAndSearchController');
const profileUpdateController = require('../../controllers/profile/profileUpdateController');
const userProfileController = require('../../controllers/profile/userProfileController');
const followUserController = require('../../controllers/profile/followUserController');
const { uploadFileS3 } = require('../../midddleware/filesS3/uploadFileS3');

const router = express.Router();

router.get('/', homePageAndSearchController);
router.get('/:username', userProfileController);
router.get('/:username/follow', followUserController);
router.post('/updateprofile', uploadFileS3, profileUpdateController);

module.exports = router;
