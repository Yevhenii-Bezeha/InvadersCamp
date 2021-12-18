import { IPost, IResponse } from '../models/IPost';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostsService {
  private _postsChanged = new Subject<IPost[]>();

  public postsChanged$ = this._postsChanged.asObservable();

  constructor(private http: HttpClient) {}

  getPosts(): Observable<IResponse> {
    return this.http.get<IResponse>('http://localhost:3000/posts');
  }

  // addLike(id: string) {
  //   this._posts.map((el) => {
  //     if (id === el.id) {
  //       el.likes += 1;
  //       return el;
  //     }
  //     return el;
  //   });
  // }
  //
  // addPost(post: IPostToAdd) {
  //   const preparedPost = { ...post, id: uuidv4(), date: new Date(), likes: 0 };
  //   this._posts.push(preparedPost);
  //   this._postsChanged.next([...this._posts]);
  // }
}
