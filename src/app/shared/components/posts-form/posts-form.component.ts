import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGetPost } from '@interfaces/IPost';
import { emptyPost } from '@interfaces/emptyPost';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { url } from '@interfaces/routes';
import { FormService } from '@services/form.service';
import { PostService } from '../../../post/post.service';
import { tagCategories } from '@interfaces/tagCategories';

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.scss'],
})
export class PostsFormComponent implements OnInit {
  public isCreateForm = true;
  public post: IGetPost = emptyPost;
  public postForm: FormGroup;

  public tagCategories: string[] = tagCategories;

  constructor(
    private _fb: FormBuilder,
    private _postService: PostService,
    private _formService: FormService,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit() {
    this.isCreateForm = this._router.url === `/${url.addPost}`;
    this.post = this.isCreateForm ? emptyPost : this._formService.post;
    this.getFormDone();
    console.log(this.post.tags);
  }

  getFormDone() {
    this.postForm = this._fb.group({
      title: [this.post.title, Validators.required],
      description: [this.post.description, Validators.required],
      tags: [this.post.tags, Validators.required],
    });
  }

  createPost() {
    this._postService.createPost(this.postForm.value);
  }

  updatePost() {
    this._postService.updatePost(this.post._id, this.postForm.value);
  }

  onSubmit() {
    this.isCreateForm ? this.createPost() : this.updatePost();
    this.postForm.reset();
    this._location.back();
  }
}
