import { ModalService } from '../../../core/services/modal.service';
import { PostsService } from '../../../core/services/posts.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.scss'],
})
export class PostsFormComponent {
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
    this._postService.createPost(this.postForm.value);
    this.postForm.reset();
    this._modalService.toggleModal();
    this._sidebarService.closeSidenav();
  }
}
