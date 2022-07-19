const bcrypt = require('bcrypt');
const User = require('../../models/User');
const handleErrors = require('../utils/handleErrors');

module.exports = async function (req, res) {
  try {
    const { email, password } = req.body;
    if (!(email && password))
      return res.status(403).json('email or password is missing');
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(403).json('user is not registered.');
    const hashPass = await bcrypt.hash(password, 10);
    user.password = hashPass;
    await user.save();

    res.status(200).json('password has been successfully updated.');
  } catch (err) {
    const message = handleErrors(err);
    res.status(403).json({ message });
  }
};
