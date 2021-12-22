import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    avatar: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model('users', userSchema);

module.exports = User;
