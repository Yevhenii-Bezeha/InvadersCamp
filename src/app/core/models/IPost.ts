export interface IPost {
  _id: string;
  authorAvatar: string;
  authorName: string;
  title: string;
  description: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IResAllPosts {
  status: number;
  message: string;
  data: IPost[];
}

export interface IResPost {
  status: number;
  message: string;
  data: IPost;
}
