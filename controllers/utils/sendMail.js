const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

const sendMail = async (email, subject, text, html) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'testuser1660@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      },
    });

    return await transport.sendMail({
      from: '"Test User 😊" <testuser1660@gmail.com>',
      to: email,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendMail;
