import { IPost, IPostUpd, IResAllPosts, IResPost } from '../models/IPost';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '@interfaces/routes';

const basicUrl = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<IPost[]> {
    return this.http
      .get<IResAllPosts>(`${basicUrl}/${url.posts}`)
      .pipe(map((data: IResAllPosts) => data.data));
  }

  getPost(id: string): Observable<IPost> {
    return this.http
      .get<IResPost>(`${basicUrl}/${url.posts}/${id}`)
      .pipe(map((data: IResPost) => data.data));
  }

  createPost(post: IPost): Observable<IPost> {
    return this.http
      .post<IResPost>(`${basicUrl}/${url.posts}`, post)
      .pipe(map((data: IResPost) => data.data));
  }

  updatePost(id: string, post: IPostUpd) {
    return this.http
      .patch<IResPost>(`${basicUrl}/${url.posts}/${id}`, post)
      .pipe(
        map((data: IResPost) => {
          return data.data;
        })
      );
  }

  deletePost(id: string): Observable<IPost> {
    return this.http.delete<IResPost>(`${basicUrl}/${url.posts}/${id}`).pipe(
      map((data: IResPost) => {
        return data.data;
      })
    );
  }
}
