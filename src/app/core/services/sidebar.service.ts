import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  public isSidenavOpened = false;
  private _isSidenavChanged = new Subject<boolean>();
  public isSidenavChanged$ = this._isSidenavChanged.asObservable();

  constructor() {}

  closeSidenav() {
    this.isSidenavOpened = false;
    this._isSidenavChanged.next(this.isSidenavOpened);
  }

  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
    this._isSidenavChanged.next(this.isSidenavOpened);
  }
}
