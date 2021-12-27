import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IComment, IResCreateComment } from '@interfaces/IPost';
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

  updateComment(comment: IComment, postId: string) {
    this.http
      .patch<IResCreateComment>(
        `${basicUrl}/${url.posts}/${postId}/${url.comments}/${comment._id}`,
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

  deleteComment(commentId: string | undefined, postId: string) {
    this.http
      .delete<IResCreateComment>(
        `${basicUrl}/${url.posts}/${postId}/${url.comments}/${commentId}`
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
}
