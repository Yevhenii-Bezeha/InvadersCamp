export interface IPost {
  id: string;
  authorName: string;
  date: Date;
  title: string;
  description: string;
  likes: number;
}

export interface IPostToAdd {
  authorName: string;
  title: string;
  description: string;
}
