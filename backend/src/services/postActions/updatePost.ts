import PostModel from '../../db/schemas/post';
import { Post } from '../../utils/types';
import * as mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

export const updatePost = (
  postId: string,
  { title, description, tags }: Post
) =>
  PostModel.findOneAndUpdate(
    { _id: new ObjectId(postId) },
    {
      $set: { title, description, tags },
    }
  );
