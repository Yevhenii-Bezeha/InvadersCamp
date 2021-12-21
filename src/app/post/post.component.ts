import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostsService } from '@services/posts.service';
import { IPost } from '@interfaces/IPost';
import { FormService } from '@services/form.service';
import { emptyPost } from '@interfaces/emptyPost';
import { Subscription } from 'rxjs';
import { url } from '@interfaces/routes';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  public post: IPost = emptyPost;
  public isFetching: boolean = false;
  public error: string = '';
  private _postId: string = '';
  private _subRoute: Subscription;
  private _subGet: Subscription;
  private _subUpd: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _postService: PostsService,
    private _formService: FormService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.getPosts();
  }

  ngOnDestroy(): void {
    this._subRoute.unsubscribe();
    this._subGet.unsubscribe();
    if (this._subUpd) {
      this._subUpd.unsubscribe();
    }
  }

  getPosts(): void {
    this._subRoute = this._route.params.subscribe(
      (params: Params) => (this._postId = params['id'])
    );
    this._subGet = this._postService.getPost(this._postId).subscribe({
      next: (post: IPost) => {
        this.post = post;
        this.isFetching = false;
      },
      error: (error) => {
        this.error = error.message;
        this.isFetching = false;
      },
    });
  }

  addLike(post: IPost): void {
    this._subUpd = this._postService
      .updatePost(post._id, { likes: post.likes + 1 })
      .subscribe({
        next: (post: IPost) => {
          this.getPosts();
        },
        error: (error) => {
          this.error = error.message;
        },
      });
  }

  onEditClick(): void {
    this._formService.openEditForm(this.post);
  }

  onDeleteClick(id: string): void {
    this._postService.deletePost(id).subscribe({
      next: (post: IPost) => {},
      error: (error) => {
        this.error = error.message;
      },
    });
    this._router.navigateByUrl(url.posts).then();
  }
}
