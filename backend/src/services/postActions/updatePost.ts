import Post from '../../db/schemas/post';
import { IPost } from '../../models/IPost';
import * as mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

export const updatePost = (
  postId: string,
  { title, description, tags }: IPost
) =>
  Post.findOneAndUpdate(
    { _id: new ObjectId(postId) },
    {
      $set: { title, description, tags },
    }
  );
