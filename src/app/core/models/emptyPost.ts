import { IGetPost } from './IPost';

export const emptyPost: IGetPost = {
  _id: '',
  title: '',
  description: '',
  userId: '',
  user: [],
  comments: [],
  likes: [],
  tags: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
