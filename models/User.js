const mongoose = require('mongoose');
const { isEmail } = require('validator');

const schemaOptions = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'lastLoginAt',
  },
};

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'enter name'],
    },
    email: {
      type: String,
      lowercase: true,
      unique: [true, 'This email is already registered'],
      validate: [isEmail, 'Please enter a valid email'],
      required: [true, 'enter email address'],
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
  },
  schemaOptions
);

const User = mongoose.model('user', UserSchema);
module.exports = User;
