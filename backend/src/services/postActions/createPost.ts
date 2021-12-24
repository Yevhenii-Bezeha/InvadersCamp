import Post from '../../db/schemas/post';
import { IPost } from '../../models/IPost';

export const createPost = (post: IPost): Promise<IPost> => Post.create(post);
