import * as mongoose from 'mongoose';
import * as Joi from 'joi';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const comment = new Schema(
  {
    message: {
      type: String,
      required: [true, 'Set message'],
    },
    postId: {
      type: ObjectId,
      ref: 'posts',
      required: [true, 'Set postId'],
    },
    userId: {
      type: ObjectId,
      ref: 'posts',
      required: [true, 'Set userId'],
    },
  },
  { versionKey: false, timestamps: true }
);

export const joiSchemaComment = Joi.object({
  message: Joi.string().min(2).required(),
  postId: Joi.string().required(),
});

export const CommentModel = mongoose.model('comments', comment);

