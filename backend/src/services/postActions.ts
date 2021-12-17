import Post from './schemas/post';
import { IPost } from '../models/IPost';

const getAllPosts = () => Post.find();

const createPost = (post: IPost): Promise<IPost> => Post.create(post);

const getPostById = (id: string) => Post.findOne({ _id: id });

const updatePost = (
  postId: any,
  { authorAvatar, authorName, title, description, likes }: IPost
) =>
  Post.findOneAndUpdate(
    { _id: postId },
    {
      $set: { authorAvatar, authorName, title, description, likes },
    }
  );

const removePost = (id: string) => Post.findByIdAndRemove({ _id: id });

export { getAllPosts, createPost, getPostById, updatePost, removePost };
