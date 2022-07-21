const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes/authRoutes');
const authenticateUser = require('./midddleware/authenticateUser/authenticateUser');
const profileUpdateRoutes = require('./routes/profile/profileUpdateRoutes');
const postRoutes = require('./routes/post/postRoutes');
const usernameRoutes = require('./routes/usernameRoutes/index');
const postViewAuthenticate = require('./midddleware/postViewAuthenticate/postViewAuthenticate');

const app = express();
const PORT = process.env.PORT || 3300;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to mongodb server.'))
  .catch(() => console.error.bind(console, 'MongoDB connection error.'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enabling anyone to access api resources
app.use(cors({}));

// routes for authentication(login,signup etc)
app.use(authRoutes);

//  authenticates user and populates userInfo property in req
app.use(authenticateUser);

// profile regarding routes ( profile update , user dashboard etc)
app.use(profileUpdateRoutes);

// username routes ( username post , username info , username follow, username unfollow)
app.use('/:username', usernameRoutes);

// view post of followed user
app.use('/post/:postid', postViewAuthenticate, postRoutes);

app.listen(PORT, () => console.log(`server running on ${PORT}`));
