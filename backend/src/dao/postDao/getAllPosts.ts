import { PostModel } from '../../models/post';
import { PostInf } from '../../utils/types';
import { Aggregate } from 'mongoose';

export const getAllPosts = (
  skip: number,
  limit: number,
  sortObj: any,
  filterByTitle: string,
  filterByTag: string
): Aggregate<PostInf[]> =>
  PostModel.aggregate([
    { $match: { tags: { $regex: filterByTag } } },
    { $match: { title: { $regex: filterByTitle } } },
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
