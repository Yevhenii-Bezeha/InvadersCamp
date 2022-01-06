import PostModel from '../../db/schemas/post';

export const getPostsCount = (filter: Object) =>
  PostModel.countDocuments(filter);
