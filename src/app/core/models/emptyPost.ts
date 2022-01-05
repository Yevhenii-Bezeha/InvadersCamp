import { PostInf } from './postRelatedTypes';

export const emptyPost: PostInf = {
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
