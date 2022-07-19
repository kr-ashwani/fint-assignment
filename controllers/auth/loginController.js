async function login_post(req, res) {
  console.log(req, res);
  res.send('login');
}

module.exports = { login_post };
