import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
  private isShowModalChanged = new Subject<boolean>();

  public isShowModalChanged$ = this.isShowModalChanged.asObservable();

  isShowModal = false;

  showModal() {
    this.isShowModal = !this.isShowModal;
    this.isShowModalChanged.next(this.isShowModal);
  }

  private isSidenavChanged = new Subject<boolean>();

  public isSidenavChanged$ = this.isSidenavChanged.asObservable();

  isSidenavOpened = false;
  showSidenav() {
    this.isSidenavOpened = true;
    this.isSidenavChanged.next(this.isSidenavOpened);
  }

  closeSidenav() {
    this.isSidenavOpened = false;
    this.isSidenavChanged.next(this.isSidenavOpened);
  }

  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
    this.isSidenavChanged.next(this.isSidenavOpened);
  }
  constructor() {}
}
