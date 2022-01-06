import PostModel from '../../db/schemas/post';
import { Post } from '../../utils/types';

export const createPost = (post: Post): Promise<Post> => PostModel.create(post);
