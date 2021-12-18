import { IPost } from './IPost';

export const emptyPost: IPost = {
  _id: '',
  authorAvatar: '',
  authorName: '',
  title: '',
  description: '',
  likes: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};
