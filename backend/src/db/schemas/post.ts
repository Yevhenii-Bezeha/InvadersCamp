import * as mongoose from 'mongoose';

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

const Post = mongoose.model('posts', post);

export default Post;
