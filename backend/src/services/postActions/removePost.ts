import PostSch from '../../db/schemas/post';
import * as mongoose from 'mongoose';
import LikeSch from '../../db/schemas/like';
import CommentSch from '../../db/schemas/comment';

const ObjectId = mongoose.Types.ObjectId;

export const removePost = (postId: string) =>
  PostSch.findByIdAndRemove({ _id: new ObjectId(postId) });

export const removeLikes = (postId: string) =>
  LikeSch.deleteMany({ postId: new ObjectId(postId) });

export const removeComments = (postId: string) =>
  CommentSch.deleteMany({ postId: new ObjectId(postId) });
