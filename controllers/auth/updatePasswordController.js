const bcrypt = require('bcrypt');
const User = require('../../models/User');
const handleErrors = require('../utils/handleErrors');

module.exports = async function (req, res) {
  try {
    const { email, password } = req.body;
    if (!(email && password))
      return res.status(403).json('eamil or password missing');
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(403).json('user is not registered.');
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) return res.status(403).json('password did not match.');
    const hashPass = await bcrypt.hash(password, 10);
    user.password = hashPass;
    await user.save();

    res.status(200).json('password has been successfully changed.');
  } catch (err) {
    const message = handleErrors(err);
    res.status(403).json({ message });
  }
};
