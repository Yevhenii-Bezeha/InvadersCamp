import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  public isSidenavOpened = false;
  private isSidenavChanged = new Subject<boolean>();
  public isSidenavChanged$ = this.isSidenavChanged.asObservable();

  constructor() {}

  closeSidenav() {
    this.isSidenavOpened = false;
    this.isSidenavChanged.next(this.isSidenavOpened);
  }

  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
    this.isSidenavChanged.next(this.isSidenavOpened);
  }
}
