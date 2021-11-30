import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/IPost';

@Injectable()
export class PostsService {

  private posts: IPost[] = [
    {
      id: 1,
      authorName: 'John Dow',
      date: 'November 2, 2021',
      title: 'Natural language interface accessibility',
      description: '  Spoken interaction with mobile devices and consumer',
      likes: 0,
    },
    {
      id: 2,
      authorName: 'John Dow',
      date: 'November 2, 2021',
      title: 'Natural language interface accessibility',
      description: '  Spoken interaction with mobile devices and consumer',
      likes: 0,
    },
  ];

  getPosts() {
    return this.posts.slice();
  }

  addLike(id: number) {
    this.posts.map((el) => {
      if (id === el.id) {
        el.likes += 1;
        return el;
      }
      return el;
    });
  }
  constructor() {}
}
