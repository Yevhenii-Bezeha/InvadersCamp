import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    avatar: {
      type: String,
      enum: [
        'sentiment_very_satisfied',
        'sentiment_satisfied',
        'sentiment_neutral',
        'sentiment_very_dissatisfied',
      ],
      default: 'sentiment_very_satisfied',
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
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
