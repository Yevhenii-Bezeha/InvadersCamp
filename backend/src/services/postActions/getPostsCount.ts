import PostSch from '../../db/schemas/post';

export const getPostsCount = (filter: Object) => PostSch.countDocuments(filter);
