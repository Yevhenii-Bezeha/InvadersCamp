import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IGetPost, ILike, IPost } from '@interfaces/IPost';
import { FormService } from '@services/form.service';
import { Subscription } from 'rxjs';
import { url } from '@interfaces/routes';
import { PostService } from '../../post.service';
import { LikesService } from '@services/likes.service';
import { emptyPost } from '@interfaces/emptyPost';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit, OnDestroy {
  public post: IGetPost[] = [];
  public copyPost: IGetPost = emptyPost;
  public isFetching: boolean = false;
  public error: string = '';
  private _postId: string = '';
  private _subRoute: Subscription;
  private _subGet: Subscription;
  private _subUpd: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _postService: PostService,
    private _likesService: LikesService,
    private _formService: FormService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.getPost();
  }

  ngOnDestroy(): void {
    this._subRoute.unsubscribe();
    this._subGet.unsubscribe();
    if (this._subUpd) {
      this._subUpd.unsubscribe();
    }
  }

  getPost(): void {
    this._subRoute = this._route.params.subscribe(
      (params: Params) => (this._postId = params['id'])
    );
    this._subGet = this._postService.getPost(this._postId).subscribe({
      next: (post: IGetPost[]) => {
        this.post = post;
        this.copyPost = post[0];
        this.isFetching = false;
      },
      error: (error) => {
        this.error = error.message;
        this.isFetching = false;
      },
    });
  }

  addLike(likes: ILike[], postId: string): void {
    const like: ILike | undefined = this._likesService.isUserLiked(likes);
    if (!like) {
      const like: ILike = {
        postId: postId,
        isLiked: true,
      };
      this._subUpd = this._likesService.createLike(like).subscribe({
        next: (like: ILike) => {
          this.getPost();
        },
        error: (error) => {
          this.error = error.message;
        },
      });
    } else {
      this._subUpd = this._likesService
        .toggleLike(like?._id, { isLiked: like.isLiked })
        .subscribe({
          next: (like: ILike) => {
            this.getPost();
          },
          error: (error) => {
            this.error = error.message;
          },
        });
    }
  }

  onEditClick(): void {
    this._formService.openEditForm(this.copyPost);
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
