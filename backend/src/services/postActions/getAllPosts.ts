import Post from '../../db/schemas/post';
import { IGetPosts } from '../../models/IPost';
import { Aggregate } from 'mongoose';

export const getAllPosts = (
  skip: number,
  limit: number,
  sortObj: any,
  filter: Object
): Aggregate<IGetPosts[]> =>
  Post.aggregate([
    { $match: filter },
    { $sort: sortObj },
    { $skip: skip },
    { $limit: limit },
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
