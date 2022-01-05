import { Comment } from '../models/types';
import * as mongoose from 'mongoose';
import CommentSch from '../db/schemas/comment';

const ObjectId = mongoose.Types.ObjectId;

const createComment = (comment: Comment): Promise<Comment> =>
  CommentSch.create(comment);

const updateComment = (commentId: string, { message }: Comment) =>
  CommentSch.findOneAndUpdate(
    { _id: new ObjectId(commentId) },
    {
      $set: { message },
    }
  );

const removeComment = (commentId: string) =>
  CommentSch.findByIdAndRemove({ _id: new ObjectId(commentId) });

export { createComment, updateComment, removeComment };
