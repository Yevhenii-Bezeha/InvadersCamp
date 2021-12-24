import { IComment } from '../models/IPost';
import * as mongoose from 'mongoose';
import Comment from '../db/schemas/comment';

const ObjectId = mongoose.Types.ObjectId;

const createComment = (comment: IComment): Promise<IComment> =>
  Comment.create(comment);

const updateComment = (commentId: string, { message }: IComment) =>
  Comment.findOneAndUpdate(
    { _id: new ObjectId(commentId) },
    {
      $set: { message },
    }
  );

const removeComment = (commentId: string) =>
  Comment.findByIdAndRemove({ _id: new ObjectId(commentId) });

export { createComment, updateComment, removeComment };
