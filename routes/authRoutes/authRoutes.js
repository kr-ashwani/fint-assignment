const express = require('express');
const {
  forgotPasswordController_get,
  forgotPasswordController_post,
} = require('../../controllers/auth/forgotPasswordController');
const loginController = require('../../controllers/auth/loginController');
const logoutController = require('../../controllers/auth/logoutController');
const signupController = require('../../controllers/auth/signupController');
const updatePasswordController = require('../../controllers/auth/updatePasswordController');

const verifyEmailController = require('../../controllers/auth/verifyEmailController');

const router = express.Router();

router.post('/signup', signupController);

router.post('/login', loginController);

router.get('/logout', logoutController);

router.get('/verifyemail', verifyEmailController);
router.post('/updatepassword', updatePasswordController);
router.route('/forgotpassword').get(forgotPasswordController_get);
router.route('/forgotpassword').post(forgotPasswordController_post);

module.exports = router;
