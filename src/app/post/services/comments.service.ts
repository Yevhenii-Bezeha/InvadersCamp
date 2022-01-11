import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs';
import { Comment, Res } from '@interfaces/postRelatedTypes';
import { url } from '@interfaces/url';
import { basicUrl } from '@interfaces/basicUrl';
import { ErrorsService } from '@services/errors.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(
    private http: HttpClient,
    private subjectsService: ErrorsService
  ) {}

  createComment(comment: Comment, postId: string) {
    return this.http
      .post<any>(`${basicUrl}/${url.posts}/${postId}/${url.comments}`, comment)
      .pipe(
        catchError((err) => {
          this.subjectsService.error.next(err);
          return err;
        }),
        map((data: Res) => data.data)
      );
  }

  updateComment(comment: Comment, postId: string) {
    return this.http
      .patch<any>(
        `${basicUrl}/${url.posts}/${postId}/${url.comments}/${comment._id}`,
        comment
      )
      .pipe(
        catchError((err) => {
          this.subjectsService.error.next(err);
          return err;
        }),
        map((data: Res) => data.data)
      );
  }

  deleteComment(commentId: string | undefined, postId: string) {
    return this.http
      .delete<any>(
        `${basicUrl}/${url.posts}/${postId}/${url.comments}/${commentId}`
      )
      .pipe(
        catchError((err) => {
          this.subjectsService.error.next(err);
          return err;
        }),
        map((data: Res) => data.data)
      );
  }
}
