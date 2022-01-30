import { PostModel } from '../../models/post';
import { PostInf } from '../../utils/types';
import * as mongoose from 'mongoose';
import { Aggregate } from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

export const getPostById = (postId: string): Aggregate<PostInf[]> =>
  PostModel.aggregate([
    { $match: { _id: new ObjectId(postId) } },
    { $limit: 1 },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $lookup: {
        from: 'likes',
        localField: '_id',
        foreignField: 'postId',
        as: 'likes',
      },
    },
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'postId',
        as: 'comments',
      },
    },
    {
      $project: {
        'user.password': 0,
        'likes.createdAt': 0,
        'likes.updatedAt': 0,
        'tags.createdAt': 0,
        'tags.updatedAt': 0,
      },
    },
  ]);
