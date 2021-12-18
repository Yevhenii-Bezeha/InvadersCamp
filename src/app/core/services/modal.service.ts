import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
  public isShowModal: boolean = false;
  private _isShowModalChanged = new Subject<boolean>();
  public isShowModalChanged$ = this._isShowModalChanged.asObservable();

  constructor() {}

  toggleModal() {
    this.isShowModal = !this.isShowModal;
    this._isShowModalChanged.next(this.isShowModal);
  }
}
