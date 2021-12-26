import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsSubjectsService {
  public _error = new Subject<string>();
  public _inputChanged = new Subject<void>();

  constructor() {}
}
