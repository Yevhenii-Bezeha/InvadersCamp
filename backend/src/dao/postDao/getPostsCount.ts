import { PostModel } from '../../models/post';

export const getPostsCount = (filter: Object) =>
  PostModel.countDocuments(filter);
