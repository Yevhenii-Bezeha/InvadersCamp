export interface IPost {
  id?: string;
  authorAvatar: string;
  authorName: string;
  title: string;
  description: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}
