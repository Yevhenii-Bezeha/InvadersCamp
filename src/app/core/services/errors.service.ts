import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  public error = new Subject<any>();

  constructor() {}
}
