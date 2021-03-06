import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs';
import { Like, Res } from '@interfaces/postRelatedTypes';
import { url } from '@interfaces/url';
import { basicUrl } from '@interfaces/basicUrl';
import { ErrorsService } from '@services/errors.service';
import { LocalStorageService } from '@services/localStorage.service';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  constructor(
    private http: HttpClient,
    private subjects: ErrorsService,
    private localStorageService: LocalStorageService
  ) {}

  isUserLiked(likesArr: Like[]): Like | undefined {
    const user = this.localStorageService.getUser();
    const userId = user._id;
    return likesArr.find((el: Like) => el.userId === userId);
  }

  createLike(like: Like, postId: string) {
    return this.http
      .post<any>(`${basicUrl}/${url.posts}/${postId}/${url.like}`, like)
      .pipe(
        catchError((err) => {
          this.subjects.error.next(err);
          return err;
        }),
        map((data: Res) => data.data)
      );
  }

  toggleLike(likeId: any, isLiked: any, postId: string) {
    return this.http
      .patch<any>(
        `${basicUrl}/${url.posts}/${postId}/${url.like}/${likeId}`,
        isLiked
      )
      .pipe(
        catchError((err) => {
          this.subjects.error.next(err);
          return err;
        }),
        map((data: Res) => data.data)
      );
  }
}
