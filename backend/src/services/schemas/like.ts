import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const like = new Schema(
  {
    isLiked: {
      type: Boolean,
      default: false,
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

const Like = mongoose.model('likes', like);

export default Like;
