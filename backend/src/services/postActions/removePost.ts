import Post from '../../db/schemas/post';
import * as mongoose from 'mongoose';
import Like from '../../db/schemas/like';
import Comment from '../../db/schemas/comment';

const ObjectId = mongoose.Types.ObjectId;

export const removePost = (postId: string) =>
  Post.findByIdAndRemove({ _id: new ObjectId(postId) });

export const removeLikes = (postId: string) =>
  Like.deleteMany({ postId: new ObjectId(postId) });

export const removeComments = (postId: string) =>
  Comment.deleteMany({ postId: new ObjectId(postId) });
