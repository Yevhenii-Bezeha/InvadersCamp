import PostSch from '../../db/schemas/post';
import { Post } from '../../models/types';

export const createPost = (post: Post): Promise<Post> => PostSch.create(post);
