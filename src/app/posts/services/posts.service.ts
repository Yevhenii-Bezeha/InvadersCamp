import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { url } from '@interfaces/url';
import { basicUrl } from '@interfaces/basicUrl';
import { ErrorsService } from '@services/errors.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient, private subjects: ErrorsService) {}

  getPosts(
    page: string,
    perPage: string,
    filterStr: string,
    sortBy: string,
    order: number
  ): Observable<any> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('page', page);
    searchParams = searchParams.append('perPage', perPage);
    searchParams = searchParams.append('filter', filterStr);
    searchParams = searchParams.append('sortBy', sortBy);
    searchParams = searchParams.append('order', order);

    return this.http
      .get<any>(`${basicUrl}/${url.posts}`, {
        params: searchParams,
      })
      .pipe(
        catchError((err) => {
          this.subjects.error.next(err);
          return err;
        }),
        map((data) => data)
      );
  }
}
