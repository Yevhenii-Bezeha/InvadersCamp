import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGetPost, ILike, IResAllPosts } from '@interfaces/IPost';
import { PostsService } from '../../services/posts.service';
import { Subscription } from 'rxjs';
import { LikesService } from '@services/likes.service';
import { PostsSubjectsService } from '@services/postsSubjects.service';
import { IPaginatorData } from '@interfaces/IPaginatorData';
import { ISortData } from '@interfaces/ISortData';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss'],
})
export class ListPostsComponent implements OnInit, OnDestroy {
  public posts: IGetPost[] = [];
  public totalCount: number | undefined = 0;
  public isFetching: boolean = false;
  public isSliced: boolean = true;
  private _filterStr: string = '';
  private _page: string = '0';
  private _perPage: string = '5';
  private _subGet: Subscription;
  private _subInpChanged: Subscription;
  private _sortBy: string = 'updatedAt';
  private _order: number = -1;

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
      .getPosts(
        this._page,
        this._perPage,
        this._filterStr,
        this._sortBy,
        this._order
      )
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

  getPaginatorData(event: IPaginatorData) {
    this._page = event.page.toString();
    this._perPage = event.perPage.toString();
    this.getPosts();
  }

  onInputChange(event: string): void {
    this._filterStr = event;
    this.getPosts();
  }

  onSort(event: ISortData): void {
    this._sortBy = event.sortBy;
    this._order = event.order;
    this.getPosts();
  }
}
