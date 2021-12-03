import { IPostToAdd } from './../interfaces/IPost';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/IPost';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostsService {
  postsChanged = new Subject<IPost[]>();

  private posts: IPost[] = [
    {
      id: uuidv4(),
      authorAvatar: 'sentiment_very_satisfied',
      authorName: 'John Dow',
      date: new Date(),
      title: 'Natural language interface accessibility',
      description: 'Spoken interaction with mobile devices and consumer',
      likes: 0,
    },
    {
      id: uuidv4(),
      authorAvatar: 'sentiment_very_satisfied',
      authorName: 'John Dow',
      date: new Date(),
      title: 'Natural language interface accessibility',
      description: 'Spoken interaction with mobile devices and consumer',
      likes: 0,
    },
  ];

  getPosts() {
    return this.posts.slice();
  }

  addLike(id: string) {
    this.posts.map((el) => {
      if (id === el.id) {
        el.likes += 1;
        return el;
      }
      return el;
    });
  }

  addPost(post: IPostToAdd) {
    const preparedPost = { ...post, id: uuidv4(), date: new Date(), likes: 0 };
    this.posts.push(preparedPost);
    this.postsChanged.next(this.posts.slice());
  }

  constructor() {}
}
