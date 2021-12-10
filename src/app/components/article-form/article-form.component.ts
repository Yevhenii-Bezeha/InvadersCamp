import { ModalService } from '@services/modal.service';
import { PostsService } from '@services/posts.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SidebarService } from '@services/sidebar.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent {
  public postForm = this._fb.group({
    authorAvatar: ['sentiment_very_satisfied'],
    authorName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
    ],
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private _fb: FormBuilder,
    private _postService: PostsService,
    private _modalService: ModalService,
    private _sidebarService: SidebarService
  ) {}

  onSubmit() {
    this._postService.addPost(this.postForm.value);
    console.log(this.postForm.value);
    this.postForm.reset();
    this._modalService.toggleModal();
    this._sidebarService.closeSidenav();
  }
}
