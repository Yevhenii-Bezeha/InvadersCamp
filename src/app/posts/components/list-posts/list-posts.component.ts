import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGetPost, ILike, IResAllPosts } from '@interfaces/IPost';
import { PostsService } from '../../posts.service';
import { Subscription } from 'rxjs';
import { LikesService } from '@services/likes.service';
import { PageEvent } from '@angular/material/paginator';
import { PostsSubjectsService } from '@services/postsSubjects.service';

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
  public isSliced: boolean = true;
  private _subGet: Subscription;
  private _subInpChanged: Subscription;

  constructor(
    private _postsService: PostsService,
    private _likesService: LikesService,
    private _subjectsService: PostsSubjectsService
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.getPosts();
    this._subInpChanged = this._subjectsService._inputChanged.subscribe(() =>
      this.getPosts()
    );
  }

  ngOnDestroy(): void {
    this._subGet.unsubscribe();
    this._subInpChanged.unsubscribe();
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
          this._subjectsService._error.next(error);
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
      this._likesService.createLike(like);
    } else {
      this._likesService.toggleLike(like?._id, { isLiked: like.isLiked });
    }
  }

  getPaginatorData(event: PageEvent) {
    this.page = event.pageIndex.toString();
    this.perPage = event.pageSize.toString();
    this.getPosts();
  }
}
