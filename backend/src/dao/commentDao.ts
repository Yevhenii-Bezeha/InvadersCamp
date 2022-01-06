import { Comment } from '../utils/types';
import * as mongoose from 'mongoose';
import { Aggregate } from 'mongoose';
import { CommentModel } from '../models/comment';

const ObjectId = mongoose.Types.ObjectId;

const getComments = (postId: string): Aggregate<Array<any>> =>
  CommentModel.aggregate([
    { $match: { postId: new ObjectId(postId) } },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    },
  ]);

const createComment = (comment: Comment): Promise<Comment> =>
  CommentModel.create(comment);

const updateComment = (commentId: string, { message }: Comment) =>
  CommentModel.findOneAndUpdate(
    { _id: new ObjectId(commentId) },
    {
      $set: { message },
    }
  );

const removeComment = (commentId: string) =>
  CommentModel.findByIdAndRemove({ _id: new ObjectId(commentId) });

export { getComments, createComment, updateComment, removeComment };
