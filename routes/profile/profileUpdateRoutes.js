const express = require('express');
const homePageAndSearchController = require('../../controllers/profile/homePageAndSearchController');
const profileUpdateController = require('../../controllers/profile/profileUpdateController');
const { uploadFileS3 } = require('../../midddleware/filesS3/uploadFileS3');

const router = express.Router();

router.get('/', homePageAndSearchController);
router.post('/updateprofile', uploadFileS3, profileUpdateController);

module.exports = router;
