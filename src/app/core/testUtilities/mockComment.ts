import { Comment } from '@interfaces/postRelatedTypes';
import { mockUser } from './mockUser';

export const mockComment: Comment = {
  _id: '61deb2d103bf62c8bb461446',
  message: 'test',
  user: [mockUser],
  postId: '61deb2d103bf62c8bb461446',
};
