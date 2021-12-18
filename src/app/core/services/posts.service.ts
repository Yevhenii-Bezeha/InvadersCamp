import { IPost, IResAllPosts, IResPost } from '../models/IPost';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostsService {
  private _posts: IPost[] = [];
  private _postsChanged = new Subject<IPost[]>();

  public postsChanged$ = this._postsChanged.asObservable();

  constructor(private http: HttpClient) {}

  getPosts(): void {
    this.http
      .get<IResAllPosts>('http://localhost:3000/posts')
      .subscribe((data: IResAllPosts) => {
        this._posts = data.data;
        this._postsChanged.next([...this._posts]);
      });
  }

  getPost(id: string): Observable<IResPost> {
    return this.http.get<IResPost>(`http://localhost:3000/posts/${id}`);
  }

  createPost(post: IPost) {
    this.http.post('http://localhost:3000/posts', post).subscribe();
    this.getPosts();
  }
}
