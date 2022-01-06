import * as mongoose from 'mongoose';

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

const Like = mongoose.model('likes', like);

export default Like;
