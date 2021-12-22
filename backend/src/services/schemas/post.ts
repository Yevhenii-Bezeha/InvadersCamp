import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  { versionKey: false, timestamps: true }
);

const Post = mongoose.model('posts', post);

export default Post;
