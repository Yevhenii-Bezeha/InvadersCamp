import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { LikesService } from '@services/likes.service';
import { PaginatorData } from '@interfaces/PaginatorData';
import { SortData } from '@interfaces/SortData';
import { BaseComponent } from '../../../shared/classes/BaseComponent';
import { Like, PostInf, ResPosts } from '@interfaces/postRelatedTypes';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss'],
})
export class ListPostsComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  public posts: PostInf[] = [];
  public totalCount: number | undefined = 0;
  public isFetching: boolean = false;
  public isSliced: boolean = true;
  private filterStr: string = '';
  private page: string = '0';
  private perPage: string = '5';
  private sortBy: string = 'updatedAt';
  private order: number = -1;

  constructor(
    private postsService: PostsService,
    private likesService: LikesService
  ) {
    super();
  }

  ngOnInit(): void {
    this.isFetching = true;
    this.getPosts();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getPosts(): void {
    super.addObserver(
      this.postsService
        .getPosts(
          this.page,
          this.perPage,
          this.filterStr,
          this.sortBy,
          this.order
        )
        .subscribe((data: ResPosts) => {
          this.posts = data.data;
          this.totalCount = data.totalCount;
          this.isFetching = false;
        })
    );
  }

  addLike(likesArr: Like[], postId: string): void {
    const like: Like | undefined = this.likesService.isUserLiked(likesArr);
    if (!like) {
      const like: Like = {
        postId: postId,
        isLiked: true,
      };
      super.addObserver(
        this.likesService.createLike(like, postId).subscribe((data) => {
          this.getPosts();
        })
      );
    } else {
      super.addObserver(
        this.likesService
          .toggleLike(like?._id, { isLiked: like.isLiked }, postId)
          .subscribe((data) => {
            this.getPosts();
          })
      );
    }
  }

  getPaginatorData(event: PaginatorData) {
    this.page = event.page.toString();
    this.perPage = event.perPage.toString();
    this.getPosts();
  }

  onInputChange(event: string): void {
    this.filterStr = event;
    this.getPosts();
  }

  onSort(event: SortData): void {
    this.sortBy = event.sortBy;
    this.order = event.order;
    this.getPosts();
  }
}
