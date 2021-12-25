import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  IGetPost,
  IPost,
  IResAllPosts,
  IResCreatePost,
} from '@interfaces/IPost';
import { url } from '@interfaces/routes';
import { basicUrl } from '@interfaces/basicUrl';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPost(id: string): Observable<IGetPost[]> {
    return this.http
      .get<IResAllPosts>(`${basicUrl}/${url.posts}/${id}`)
      .pipe(map((data: IResAllPosts) => data.data));
  }

  createPost(post: IPost): Observable<IPost> {
    return this.http
      .post<IResCreatePost>(`${basicUrl}/${url.posts}`, post)
      .pipe(map((data: IResCreatePost) => data.data));
  }

  updatePost(id: string, post: IPost) {
    return this.http
      .patch<IResCreatePost>(`${basicUrl}/${url.posts}/${id}`, post)
      .pipe(map((data: IResCreatePost) => data.data));
  }

  deletePost(id: string): Observable<IPost> {
    return this.http
      .delete<IResCreatePost>(`${basicUrl}/${url.posts}/${id}`)
      .pipe(
        map((data: IResCreatePost) => {
          return data.data;
        })
      );
  }
}
