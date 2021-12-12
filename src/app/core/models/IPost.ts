export interface IPost {
  id: string;
  authorAvatar: string;
  authorName: string;
  date: Date;
  title: string;
  description: string;
  likes: number;
}

export interface IPostToAdd {
  authorAvatar: string;
  authorName: string;
  title: string;
  description: string;
}
