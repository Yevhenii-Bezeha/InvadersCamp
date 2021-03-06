export interface ResPosts {
  status: number;
  message: string;
  data: [];
  totalCount?: number;
}

export interface Res {
  status: number;
  message: string;
  data: {};
}

export interface PostInf {
  readonly _id: string;
  title: string;
  description: string;
  tags: string[];
  readonly userId: string;
  user: User[];
  comments: [];
  likes: Like[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Post {
  readonly _id?: string;
  title: string;
  description: string;
  tags: string[];
  readonly userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  readonly _id?: string;
  avatar: string;
  name: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Comment {
  readonly _id?: string;
  message: string;
  user: User[];
  readonly postId: string;
  readonly userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Like {
  _id?: string;
  isLiked: boolean;
  readonly postId: string;
  readonly userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
