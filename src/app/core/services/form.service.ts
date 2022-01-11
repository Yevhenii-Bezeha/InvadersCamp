import { Injectable } from '@angular/core';
import { PostInf } from '@interfaces/postRelatedTypes';
import { Router } from '@angular/router';
import { url } from '@interfaces/url';

@Injectable({ providedIn: 'root' })
export class FormService {
  public post: PostInf;

  constructor(private router: Router) {}

  openAddForm() {
    this.router.navigateByUrl(url.addPost).then();
  }

  openEditForm(post: PostInf) {
    this.post = post;
    this.router.navigateByUrl(url.editPost).then();
  }
}
