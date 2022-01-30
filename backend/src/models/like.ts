import * as mongoose from 'mongoose';
import * as Joi from 'joi';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const like = new Schema(
  {
    isLiked: {
      type: Boolean,
      default: false,
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

export const joiSchemaLike = Joi.object({
  isLiked: Joi.boolean().required(),
  postId: Joi.string().required(),
});

export const LikeModel = mongoose.model('likes', like);


