const User = require('../../models/User');
const handleErrors = require('../utils/handleErrors');

const followerListController = async (req, res) => {
  try {
    const followers = [];
    const followersPromise = req.userInfo.followers.map(async (elem) => {
      const userDetail = await User.findOne(
        { _id: elem },
        {
          _id: 0,
          usernameChangedTimestamp: 0,
          password: 0,
          emailVerifyCode: 0,
          emailVerifyType: 0,
          __v: 0,
        }
      ).exec();
      followers.push(userDetail);
    });
    await Promise.all(followersPromise);

    res.status(200).json({ followers });
  } catch (err) {
    const message = handleErrors(err);
    res.status(400).json({ message });
  }
};

const followingListController = async (req, res) => {
  try {
    const following = [];
    const followingPromise = req.userInfo.following.map(async (elem) => {
      const userDetail = await User.findOne(
        { _id: elem },
        {
          _id: 0,
          usernameChangedTimestamp: 0,
          password: 0,
          emailVerifyCode: 0,
          emailVerifyType: 0,
          __v: 0,
        }
      ).exec();
      following.push(userDetail);
    });
    await Promise.all(followingPromise);

    res.status(200).json({ following });
  } catch (err) {
    const message = handleErrors(err);
    res.status(400).json({ message });
  }
};

module.exports = { followerListController, followingListController };
