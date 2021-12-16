import { IPost, IPostToAdd } from '../models/IPost';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostsService {
  private _postsChanged = new Subject<IPost[]>();

  public postsChanged$ = this._postsChanged.asObservable();

  private _posts: IPost[] = [
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

  constructor(private http: HttpClient) {}

  getPosts() {
    return [...this._posts];
  }

  addLike(id: string) {
    this._posts.map((el) => {
      if (id === el.id) {
        el.likes += 1;
        return el;
      }
      return el;
    });
  }

  addPost(post: IPostToAdd) {
    const preparedPost = { ...post, id: uuidv4(), date: new Date(), likes: 0 };
    this._posts.push(preparedPost);
    this._postsChanged.next([...this._posts]);
  }

  getFromServer() {
    return this.http.get('/posts');
  }
}
