import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  IComment,
  IPost,
  IResCreateComment,
  IResCreatePost,
} from '@interfaces/IPost';
import { url } from '@interfaces/routes';
import { basicUrl } from '@interfaces/basicUrl';
import { PostsSubjectsService } from '@services/postsSubjects.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(
    private http: HttpClient,
    private _subjectsService: PostsSubjectsService
  ) {}

  createComment(comment: IComment, postId: string) {
    this.http
      .post<IResCreateComment>(
        `${basicUrl}/${url.posts}/${postId}/${url.comments}`,
        comment
      )
      .pipe(map((data: IResCreateComment) => data.data))
      .subscribe({
        next: (comment: IComment) => {
          this._subjectsService._inputChanged.next();
        },
        error: (error) => {
          this._subjectsService._error.next(error);
        },
      });
  }

  updatePost(id: string, post: IPost) {
    return this.http
      .patch<IResCreatePost>(`${basicUrl}/${url.posts}/${id}`, post)
      .pipe(map((data: IResCreatePost) => data.data));
  }

  deletePost(postId: string): Observable<IPost> {
    return this.http
      .delete<IResCreatePost>(`${basicUrl}/${url.posts}/${postId}`)
      .pipe(
        map((data: IResCreatePost) => {
          return data.data;
        })
      );
  }
}
