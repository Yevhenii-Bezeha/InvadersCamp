import { Injectable } from '@angular/core';
import { IGetPost } from '@interfaces/IPost';
import { Router } from '@angular/router';
import { url } from '@interfaces/routes';

@Injectable({ providedIn: 'root' })
export class FormService {
  public post: IGetPost;

  constructor(private _router: Router) {}

  openAddForm() {
    this._router.navigateByUrl(url.addPost).then();
  }

  openEditForm(post: IGetPost) {
    this.post = post;
    this._router.navigateByUrl(url.editPost).then();
  }
}
