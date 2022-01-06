import * as mongoose from 'mongoose';
import * as Joi from 'joi';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const post = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Set title'],
    },
    description: {
      type: String,
      required: [true, 'Set description'],
    },
    tags: {
      type: Array,
      required: [true, 'Set tags'],
    },
    userId: {
      type: ObjectId,
      ref: 'users',
      required: [true, 'Set userId'],
    },
  },
  { versionKey: false, timestamps: true }
);

export const joiSchemaPost = Joi.object({
  title: Joi.string().min(2).required(),
  description: Joi.string().min(2).required(),
  tags: Joi.array().required(),
});

export const PostModel = mongoose.model('posts', post);
