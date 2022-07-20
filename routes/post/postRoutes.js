const express = require('express');
const uploadPostController = require('../../controllers/post/uploadPostController');
const { uploadFileS3 } = require('../../midddleware/filesS3/uploadFileS3');

const router = express.Router();

router.post('/uploadpost', uploadFileS3, uploadPostController);

module.exports = router;
