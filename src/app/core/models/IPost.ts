export interface IPost {
  id: string;
  authorAvatar: string;
  authorName: string;
  title: string;
  description: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IResponse {
  status: number;
  message: string;
  data: IPost[];
}

export interface IPostToAdd {
  authorAvatar: string;
  authorName: string;
  title: string;
  description: string;
}
