const express = require('express');
const loginController = require('../../controllers/auth/loginController');
const logoutController = require('../../controllers/auth/logoutController');
const signupController = require('../../controllers/auth/signupController');
const updatePasswordController = require('../../controllers/auth/updatePasswordController');
const verifyEmailController = require('../../controllers/auth/verifyEmailController');

const router = express.Router();

router.route('/signup').post(signupController.signup_post);

router.route('/login').post(loginController.login_post);

router.get('/logout', logoutController);

router.get('/verifyemail', verifyEmailController);
router.post('/updatepassword', updatePasswordController);
router.post('/forgotpassword', updatePasswordController);

module.exports = router;
