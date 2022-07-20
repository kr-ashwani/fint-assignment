const mongoose = require('mongoose');
const { isEmail } = require('validator');

const schemaOptions = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'lastLoginAt',
  },
};
const isUsername = (username) =>
  Boolean(username.match(/^[a-z0-9]([._-](?![._-])|[a-z0-9]){5,28}[a-z0-9]$/));

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'enter name'],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: [true, 'This email is already registered'],
      validate: [isEmail, 'Please enter a valid email'],
      required: [true, 'enter email address'],
    },
    username: {
      type: String,
      lowercase: true,
      trim: true,
      unique: [true, 'This username already exists.'],
      validate: [isUsername, 'Please enter a valid username.'],
      required: [true, 'enter username'],
    },
    emailVerified: {
      type: Boolean,
      required: [true, 'email verified missing'],
    },
    password: {
      type: String,
      minlength: [6, 'Minimum password length should be 6 characters'],
      required: [true, 'enter password'],
    },
    photoUrl: {
      type: String,
      required: [true, 'enter user photo Url'],
    },
    emailVerifyCode: String,
    emailVerifyType: String,
    following: {
      type: [String],
      default: [],
    },
    followers: {
      type: [String],
      default: [],
    },
    usernameChangedTimestamp: {
      type: Number,
      default: () => Date.now(),
    },
  },
  schemaOptions
);

const User = mongoose.model('user', UserSchema);
module.exports = User;
