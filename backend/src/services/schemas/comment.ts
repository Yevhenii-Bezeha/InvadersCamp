import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const comment = new Schema(
  {
    message: {
      type: String,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'posts',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'posts',
    },
  },
  { versionKey: false, timestamps: true }
);

const Comment = mongoose.model('comments', comment);

export default Comment;
