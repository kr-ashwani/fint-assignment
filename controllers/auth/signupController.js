const bcrypt = require('bcrypt');
const crypto = require('crypto');
const handleErrors = require('../utils/handleErrors');
const User = require('../../models/User');
const sendMail = require('../utils/sendMail');

module.exports = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;
    const photoUrl = 'https://avatars.dicebear.com/api/micah/random.svg';

    if (!(name && email && password && username))
      return res
        .status(400)
        .json('name, email or password or username is missing ');

    if (password.length < 6)
      return res
        .status(403)
        .json('password should contain atleast 6 characters.');
    const hashedPassword = await bcrypt.hash(password, 10);

    const checkUser = await User.findOne({ email }).exec();
    if (checkUser)
      return res
        .status(400)
        .json('you have an existing account.Try logging in.');

    const emailVerifyCode = crypto.randomBytes(50).toString('hex');
    await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      photoUrl,
      emailVerified: false,
      emailVerifyCode,
      emailVerifyType: 'signup',
    });

    const sendLink = `${process.env.SERVER_ENDPOINT}/verifyemail/?code=${emailVerifyCode}&email=${email}`;
    const emailHTML = `
    <strong>This a email regarding email verification of your account created on APP_NAME.</strong>
    <p>Please click on the link to verify your account </p>
    <a href='${sendLink}'>${sendLink}</a>
    `;
    await sendMail(email, 'Verify account', '', emailHTML);

    setTimeout(() => {
      async function deleteUnverifiedUser() {
        const user = await User.findOne({ email }).exec();
        if (!user) return;
        if (user.emailVerified) return;
        await User.findOneAndDelete({ email });
        console.log(
          `Account of user ${email} has been deleted because user failed to verify the email.`
        );
      }
      deleteUnverifiedUser();
    }, 2 * 60 * 1000);

    res
      .status(200)
      .json(
        'Please check your mail and click on the link to verify your Account within 2 minutes.'
      );
  } catch (err) {
    const message = handleErrors(err);
    res.status(403).json({ message });
  }
};
