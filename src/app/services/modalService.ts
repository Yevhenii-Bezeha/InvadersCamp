import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
  isShowModalChanged = new Subject<boolean>();
  isShowModal = false;
  showModal() {
    this.isShowModal = !this.isShowModal;
    this.isShowModalChanged.next(this.isShowModal);
  }

  isSidenavChanged = new Subject<boolean>();
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
