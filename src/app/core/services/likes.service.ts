import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ILike, IResCreateLike } from '@interfaces/IPost';
import { url } from '@interfaces/routes';
import { basicUrl } from '@interfaces/basicUrl';
import { userId } from '@interfaces/userId';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  constructor(private http: HttpClient) {}

  isUserLiked(likes: ILike[]): ILike | undefined {
    return likes.find((el: ILike) => el.userId === userId);
  }

  createLike(like: ILike): Observable<ILike> {
    return this.http
      .post<IResCreateLike>(`${basicUrl}/${url.posts}/${url.like}`, like)
      .pipe(map((data: IResCreateLike) => data.data));
  }

  toggleLike(likeId: any, isLiked: any): Observable<ILike> {
    return this.http
      .patch<IResCreateLike>(
        `${basicUrl}/${url.posts}/${url.like}/${likeId}`,
        isLiked
      )
      .pipe(map((data: IResCreateLike) => data.data));
  }
}
