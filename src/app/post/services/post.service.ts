import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  IGetPost,
  IPost,
  IResAllPosts,
  IResCreatePost,
} from '../../core/models/IPost';
import { url } from '@interfaces/routes';
import { basicUrl } from '@interfaces/basicUrl';
import { PostsSubjectsService } from '@services/postsSubjects.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private http: HttpClient,
    private _subjects: PostsSubjectsService
  ) {}

  getPost(postId: string): Observable<IGetPost[]> {
    return this.http
      .get<IResAllPosts>(`${basicUrl}/${url.posts}/${postId}`)
      .pipe(map((data: IResAllPosts) => data.data));
  }

  createPost(post: IPost) {
    this.http
      .post<IResCreatePost>(`${basicUrl}/${url.posts}`, post)
      .pipe(map((data: IResCreatePost) => data.data))
      .subscribe({
        next: (post: IPost) => {},
        error: (error) => {
          this._subjects._error.next(error);
        },
      });
  }

  updatePost(postId: string, post: IPost) {
    this.http
      .patch<IResCreatePost>(`${basicUrl}/${url.posts}/${postId}`, post)
      .pipe(map((data: IResCreatePost) => data.data))
      .subscribe({
        next: (post: IPost) => {},
        error: (error) => {
          this._subjects._error.next(error);
        },
      });
  }

  deletePost(postId: string) {
    this.http
      .delete<IResCreatePost>(`${basicUrl}/${url.posts}/${postId}`)
      .pipe(
        map((data: IResCreatePost) => {
          return data.data;
        })
      )
      .subscribe({
        next: (post: IPost) => {},
        error: (error) => {
          this._subjects._error.next(error);
        },
      });
  }
}
