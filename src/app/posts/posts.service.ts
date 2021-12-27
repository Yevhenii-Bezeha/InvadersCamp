import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResAllPosts } from '@interfaces/IPost';
import { url } from '@interfaces/routes';
import { basicUrl } from '@interfaces/basicUrl';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(
    page: string,
    perPage: string,
    filterStr: string,
    sortBy: string,
    order: number
  ): Observable<IResAllPosts> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('page', page);
    searchParams = searchParams.append('perPage', perPage);
    searchParams = searchParams.append('filter', filterStr);
    searchParams = searchParams.append('sortBy', sortBy);
    searchParams = searchParams.append('order', order);

    return this.http.get<IResAllPosts>(`${basicUrl}/${url.posts}`, {
      params: searchParams,
    });
  }
}
