import { PostsService } from '@services/posts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IPost } from '@interfaces/IPost';
import { emptyPost } from '@interfaces/emptyPost';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { url } from '@interfaces/routes';
import { FormService } from '@services/form.service';

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.scss'],
})
export class PostsFormComponent implements OnInit, OnDestroy {
  public isCreateForm = true;
  public post: IPost = emptyPost;
  public postForm: FormGroup;
  public error: string = '';

  private _subCreate: Subscription;
  private _subUpd: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _postService: PostsService,
    private _formService: FormService,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit() {
    this.isCreateForm = this._router.url === `/${url.addPost}`;
    this.post = this.isCreateForm ? emptyPost : this._formService.post;
    this.getFormDone();
  }

  ngOnDestroy() {
    if (this._subCreate) {
      this._subCreate.unsubscribe();
    }
    if (this._subUpd) {
      this._subUpd.unsubscribe();
    }
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

  createPost() {
    this._subCreate = this._postService
      .createPost(this.postForm.value)
      .subscribe({
        next: (post: IPost) => {},
        error: (error) => {
          this.error = error.message;
        },
      });
  }

  updatePost() {
    this._subUpd = this._postService
      .updatePost(this.post._id, this.postForm.value)
      .subscribe({
        next: (post: IPost) => {},
        error: (error) => {
          this.error = error.message;
        },
      });
  }

  onSubmit() {
    this.isCreateForm ? this.createPost() : this.updatePost();
    this.postForm.reset();
    this._location.back();
  }
}
