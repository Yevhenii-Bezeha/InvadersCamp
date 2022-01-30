import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private Auth = new BehaviorSubject<boolean>(false);
  public Auth$ = this.Auth.asObservable();

  constructor() {}

  addAuth(): void {
    this.Auth.next(true);
  }

  removeAuth(): void {
    this.Auth.next(false);
  }
}
