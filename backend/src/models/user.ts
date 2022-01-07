import * as mongoose from 'mongoose';
import * as Joi from 'joi';

const Schema = mongoose.Schema;

const emailRegexp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

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
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

export const joiSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const joiSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const UserModel = mongoose.model('users', userSchema);
