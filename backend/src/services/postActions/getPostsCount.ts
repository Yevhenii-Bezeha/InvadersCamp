import Post from '../../db/schemas/post';

export const getPostsCount = () => Post.countDocuments();
