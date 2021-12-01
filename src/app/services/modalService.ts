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
  constructor() {}
}
