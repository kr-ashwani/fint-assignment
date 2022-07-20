const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../../models/User');
const handleErrors = require('../utils/handleErrors');
const sendMail = require('../utils/sendMail');

const forgotPasswordController_post = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { email, code } = req.query;
    if (!(email && code && newPassword))
      return res.status(403).json('email or newPassword or code is missing');
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(403).json('user is not registered.');

    if (!user.emailVerifyCode)
      return res.status(403).json('link cannot be used more than once.');
    if (user.emailVerifyCode !== code)
      return res.status(403).json('link is tampered.');
    if (!user.emailVerifyType === 'restPassword')
      return res.status(403).json('link is not compatible.');

    if (newPassword.length < 6)
      return res
        .status(403)
        .json('newPassword should contain atleast 6 characters.');
    const hashPass = await bcrypt.hash(newPassword, 10);
    user.password = hashPass;
    user.emailVerifyCode = '';
    user.emailVerifyType = '';
    await user.save();

    res.status(200).json('password has been successfully updated.');
  } catch (err) {
    const message = handleErrors(err);
    res.status(403).json({ message });
  }
};

const forgotPasswordController_get = async (req, res) => {
  const { email } = req.query;

  if (!email) return res.status(403).json('email is missing');

  const user = await User.findOne({ email }).exec();
  if (!user) return res.status(403).json('user is not registered');

  const emailVerifyCode = crypto.randomBytes(50).toString('hex');
  user.emailVerifyCode = emailVerifyCode;
  user.emailVerifyType = 'resetPassword';
  await user.save();

  const sendLink = `${process.env.SERVER_ENDPOINT}/forgotpassword/?code=${emailVerifyCode}&email=${email}`;
  const emailHTML = `
  <strong>This a email regarding password reset of your account created on APP_NAME.</strong>
  <p>Please click on the link to reset password and add new password. </p>
  <a href='${sendLink}'>${sendLink}</a>
  `;
  await sendMail(email, 'Passowd Reset', '', emailHTML);

  setTimeout(() => {
    async function deleteVerifyCode() {
      const userInfo = await User.findOne({ email }).exec();
      if (!userInfo) return;
      if (userInfo.emailVerifyCode !== emailVerifyCode) return;
      userInfo.emailVerifyCode = '';
      userInfo.emailVerifyType = '';
      await userInfo.save();
    }
    deleteVerifyCode();
  }, 2 * 60 * 1000);

  res
    .status(200)
    .json(
      'Please check your email for password reset link and change password within 2 minutes.'
    );
};

module.exports = {
  forgotPasswordController_post,
  forgotPasswordController_get,
};
