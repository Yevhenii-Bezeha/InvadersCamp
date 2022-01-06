import { PostModel } from '../../models/post';

export const getPostsCount = (filterByTitle: string, filterByTag: string) =>
  PostModel.aggregate([
    { $match: { tags: { $regex: filterByTag } } },
    { $match: { title: { $regex: filterByTitle } } },
    { $count: 'count' },
  ]);
