import Post from '../../db/schemas/post';

export const getPostsCount = (filter: Object) => Post.countDocuments(filter);
