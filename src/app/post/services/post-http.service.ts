import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Post, Res } from '@interfaces/postRelatedTypes';
import { url } from '@interfaces/url';
import { basicUrl } from '@interfaces/basicUrl';
import { ErrorsService } from '@services/errors.service';

@Injectable({
  providedIn: 'root',
})
export class PostHttpService {
  constructor(private http: HttpClient, private subjects: ErrorsService) {}

  getPost(postId: string | null): Observable<any> {
    return this.http.get<any>(`${basicUrl}/${url.posts}/${postId}`).pipe(
      catchError((err) => {
        this.subjects.error.next(err);
        return err;
      }),
      map((data: Res) => data.data)
    );
  }

  createPost(post: Post) {
    return this.http.post<any>(`${basicUrl}/${url.posts}`, post).pipe(
      catchError((err) => {
        this.subjects.error.next(err);
        return err;
      }),
      map((data: Res) => data.data)
    );
  }

  updatePost(postId: string, post: Post) {
    return this.http
      .patch<any>(`${basicUrl}/${url.posts}/${postId}`, post)
      .pipe(
        catchError((err) => {
          this.subjects.error.next(err);
          return err;
        }),
        map((data: Res) => data.data)
      );
  }

  deletePost(postId: string) {
    return this.http.delete<any>(`${basicUrl}/${url.posts}/${postId}`).pipe(
      catchError((err) => {
        this.subjects.error.next(err);
        return err;
      }),
      map((data: Res) => data.data)
    );
  }
}
