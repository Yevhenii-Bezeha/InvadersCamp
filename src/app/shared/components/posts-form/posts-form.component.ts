import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostInf } from '@interfaces/postRelatedTypes';
import { emptyPost } from '@interfaces/emptyPost';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { url } from '@interfaces/url';
import { FormService } from '@services/form.service';
import { tagsEnum } from '@interfaces/tagsEnum';
import { PostHttpService } from '../../../post/services/post-http.service';
import { BaseComponent } from '../../classes/BaseComponent';

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.scss'],
})
export class PostsFormComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  public isCreateForm = true;
  public post: PostInf = emptyPost;
  public postForm: FormGroup;
  public tagCategories: string[] = Object.keys(tagsEnum);

  constructor(
    private fb: FormBuilder,
    private postService: PostHttpService,
    private formService: FormService,
    private router: Router,
    private location: Location
  ) {
    super();
  }

  ngOnInit() {
    this.isCreateForm = this.router.url === `/${url.addPost}`;
    this.post = this.isCreateForm ? emptyPost : this.formService.post;
    this.getFormDone();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getFormDone() {
    this.postForm = this.fb.group({
      title: [this.post.title, Validators.required],
      description: [this.post.description, Validators.required],
      tags: [this.post.tags, Validators.required],
    });
  }

  createPost() {
    super.addObserver(
      this.postService.createPost(this.postForm.value).subscribe()
    );
  }

  updatePost() {
    super.addObserver(
      this.postService
        .updatePost(this.post._id, this.postForm.value)
        .subscribe()
    );
  }

  onSubmit() {
    this.isCreateForm ? this.createPost() : this.updatePost();
    this.postForm.reset();
    this.location.back();
  }
}
