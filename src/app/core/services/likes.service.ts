import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ILike, IResCreateLike } from '@interfaces/IPost';
import { url } from '@interfaces/routes';
import { basicUrl } from '@interfaces/basicUrl';
import { userId } from '@interfaces/userId';
import { PostsSubjectsService } from '@services/postsSubjects.service';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  constructor(
    private _http: HttpClient,
    private _subjects: PostsSubjectsService
  ) {}

  isUserLiked(likes: ILike[]): ILike | undefined {
    return likes.find((el: ILike) => el.userId === userId);
  }

  createLike(like: ILike) {
    this._http
      .post<IResCreateLike>(`${basicUrl}/${url.posts}/${url.like}`, like)
      .pipe(map((data: IResCreateLike) => data.data))
      .subscribe({
        next: (like: ILike) => {
          this._subjects._inputChanged.next();
        },
        error: (error) => {
          this._subjects._error.next(error);
        },
      });
  }

  toggleLike(likeId: any, isLiked: any) {
    this._http
      .patch<IResCreateLike>(
        `${basicUrl}/${url.posts}/${url.like}/${likeId}`,
        isLiked
      )
      .pipe(map((data: IResCreateLike) => data.data))
      .subscribe({
        next: (like: ILike) => {
          this._subjects._inputChanged.next();
        },
        error: (error) => {
          this._subjects._error.next(error);
        },
      });
  }
}
