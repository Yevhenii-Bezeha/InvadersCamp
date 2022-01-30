import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Res, User } from '../models/postRelatedTypes';
import { url } from '../models/url';
import { basicUrl } from '../models/basicUrl';
import { ErrorsService } from './errors.service';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthService {
  constructor(
    private http: HttpClient,
    private subjectsService: ErrorsService
  ) {}

  signup(user: User): Observable<{}> {
    return this.http
      .post<any>(`${basicUrl}/${url.signup}`, user)
      .pipe(map((data: Res) => data.data));
  }

  login(user: any) {
    return this.http
      .post<any>(`${basicUrl}/${url.signin}`, user)
      .pipe(map((data: Res) => data.data));
  }

  logout() {
    return this.http.get<any>(`${basicUrl}/${url.logout}`).pipe(
      catchError((err) => {
        this.subjectsService.error.next(err);
        return err;
      }),
      map((data: Res) => data.data)
    );
  }

  refresh() {
    return this.http
      .get<any>(`${basicUrl}/${url.refresh}`, { withCredentials: true })
      .pipe(map((data: Res) => data.data));
  }
}
