export interface IGetPosts {
  readonly _id: string;
  title: string;
  description: string;
  readonly userId: string;
  user: IUser[];
  comments: IComment[];
  likes: ILike[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPost {
  readonly _id: string;
  title: string;
  description: string;
  readonly userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  readonly _id?: string;
  avatar: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IComment {
  readonly _id?: string;
  message: string;
  readonly postId: string;
  readonly userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILike {
  _id?: string;
  isLiked: boolean;
  readonly postId: string;
  readonly userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITag {
  _id?: string;
  text: string;
  readonly postId: string;
  readonly userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
