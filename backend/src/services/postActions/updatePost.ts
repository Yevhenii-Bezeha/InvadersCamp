import PostSch from '../../db/schemas/post';
import { Post } from '../../models/types';
import * as mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

export const updatePost = (
  postId: string,
  { title, description, tags }: Post
) =>
  PostSch.findOneAndUpdate(
    { _id: new ObjectId(postId) },
    {
      $set: { title, description, tags },
    }
  );
