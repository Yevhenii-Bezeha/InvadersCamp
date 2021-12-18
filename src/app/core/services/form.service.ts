import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class FormService {
  public isCreateForm: boolean = false;
  private _isCreateFormChanged = new Subject<boolean>();
  public isCreateFormChanged$ = this._isCreateFormChanged.asObservable();

  constructor() {}

  openCreateForm() {
    this.isCreateForm = true;
    this._isCreateFormChanged.next(this.isCreateForm);
  }

  openEditForm() {
    this.isCreateForm = false;
    this._isCreateFormChanged.next(this.isCreateForm);
  }
}
