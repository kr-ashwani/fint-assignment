const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes/authRoutes');
const authenticateUser = require('./midddleware/authenticateUser/authenticateUser');

const app = express();
const PORT = process.env.PORT || 3300;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to mongodb server.'))
  .catch(() => console.error.bind(console, 'MongoDB connection error.'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ['http://localhost:3300'],
    credentials: true,
  })
);

app.use(authRoutes);

app.get('/', authenticateUser, (req, res) => {
  console.log(req.user);
  res.send('ok');
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));
