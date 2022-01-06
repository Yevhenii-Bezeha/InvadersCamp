import PostModel from '../../db/schemas/post';
import * as mongoose from 'mongoose';
import LikeModel from '../../db/schemas/like';
import CommentModel from '../../db/schemas/comment';

const ObjectId = mongoose.Types.ObjectId;

export const removePost = (postId: string) =>
  PostModel.findByIdAndRemove({ _id: new ObjectId(postId) });

export const removeLikes = (postId: string) =>
  LikeModel.deleteMany({ postId: new ObjectId(postId) });

export const removeComments = (postId: string) =>
  CommentModel.deleteMany({ postId: new ObjectId(postId) });
