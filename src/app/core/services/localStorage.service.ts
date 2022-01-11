import { Injectable } from '@angular/core';
import { UserDto } from '@interfaces/userDto';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setUser(user: UserDto): void {
    const userJson = JSON.stringify(user);
    localStorage.setItem('user', userJson);
  }

  getUser() {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      return;
    }
    return JSON.parse(userJson);
  }

  deleteItems(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
