import * as mongoose from 'mongoose';
import { tagCategories } from '../../models/tagCategories';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const tag = new Schema(
  {
    text: {
      type: String,
      enum: [...tagCategories],
      default: 'Reviews',
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

const Tag = mongoose.model('tags', tag);

export default Tag;
