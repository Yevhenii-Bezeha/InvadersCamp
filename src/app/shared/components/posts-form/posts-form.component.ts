import { ModalService } from '@services/modal.service';
import { PostsService } from '@services/posts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SidebarService } from '@services/sidebar.service';
import { FormService } from '@services/form.service';
import { Subscription } from 'rxjs';
import { IPost } from '@interfaces/IPost';
import { emptyPost } from '@interfaces/emptyPost';

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.scss'],
})
export class PostsFormComponent implements OnInit, OnDestroy {
  public isCreateForm: boolean;
  public post: IPost;
  public postForm: FormGroup;

  private _sub: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _postService: PostsService,
    private _modalService: ModalService,
    private _sidebarService: SidebarService,
    private _formService: FormService
  ) {}

  ngOnInit() {
    this.isCreateForm = this._formService.isCreateForm;
    this._sub = this._formService.isCreateFormChanged$.subscribe(
      (isCreateForm: boolean) => {
        this.isCreateForm = isCreateForm;
      }
    );
    this.post = this.isCreateForm ? emptyPost : this._postService.post;
    this.getFormDone();
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  getFormDone() {
    this.postForm = this._fb.group({
      authorAvatar: [this.post.authorAvatar || 'sentiment_very_satisfied'],
      authorName: [
        this.post.authorName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      title: [this.post.title, Validators.required],
      description: [this.post.description, Validators.required],
    });
  }

  onSubmit() {
    this._postService.createPost(this.postForm.value);
    this.postForm.reset();
    this._modalService.toggleModal();
    this._sidebarService.closeSidenav();
  }
}
