import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGetPost, ILike, IResAllPosts } from '@interfaces/IPost';
import { PostsService } from '../../posts.service';
import { Subscription } from 'rxjs';
import { LikesService } from '@services/likes.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss'],
})
export class ListPostsComponent implements OnInit, OnDestroy {
  public posts: IGetPost[] = [];
  public totalCount: number | undefined = 0;
  public isFetching: boolean = false;
  public page: string = '0';
  public perPage: string = '5';
  public error: string = '';
  public isSliced: boolean = true;
  private _subGet: Subscription;
  private _subUpd: Subscription;

  constructor(
    private _postsService: PostsService,
    private _likesService: LikesService
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.getPosts();
  }

  ngOnDestroy(): void {
    this._subGet.unsubscribe();
    if (this._subUpd) {
      this._subUpd.unsubscribe();
    }
  }

  getPosts(): void {
    this._subGet = this._postsService
      .getPosts(this.page, this.perPage)
      .subscribe({
        next: (data: IResAllPosts) => {
          this.posts = data.data;
          this.totalCount = data.totalCount;
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
          this.getPosts();
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
            this.getPosts();
          },
          error: (error) => {
            this.error = error.message;
          },
        });
    }
  }

  getPaginatorData(event: PageEvent) {
    this.page = event.pageIndex.toString();
    this.perPage = event.pageSize.toString();
    this.getPosts();
  }
}
