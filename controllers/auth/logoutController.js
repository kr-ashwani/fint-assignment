module.exports = async function (req, res) {
  res.clearCookie('_auth_token', {
    httpOnly: true,
    maxAge: process.env.REFRESH_TOKEN_EXP_TIME,
    sameSite: 'lax',
  });
  res.status(200).json('user logged out successfully.');
};
