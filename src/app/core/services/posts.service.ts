import { IPost, IResAllPosts, IResPost } from '../models/IPost';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostsService {
  public post: IPost;
  private _postChanged = new Subject<IPost>();
  public postChanged$ = this._postChanged.asObservable();

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

  getPost(id: string): void {
    this.http
      .get<IResPost>(`http://localhost:3000/posts/${id}`)
      .subscribe((data: IResPost) => {
        this.post = data.data;
        this._postChanged.next({ ...this.post });
      });
  }

  createPost(post: IPost) {
    this.http.post('http://localhost:3000/posts', post).subscribe();
    this.getPosts();
  }
}
