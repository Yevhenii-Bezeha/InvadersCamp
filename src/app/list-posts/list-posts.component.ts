import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPost } from '@interfaces/IPost';
import { Subscription } from 'rxjs';
import { PostsService } from '@services/posts.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss'],
})
export class ListPostsComponent implements OnInit, OnDestroy {
  public posts: IPost[] = [];
  public isFetching: boolean = false;
  public error: string = '';
  public test: String;
  private _subGet: Subscription;
  private _subUpd: Subscription;

  constructor(private _postService: PostsService) {}

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
    this._subGet = this._postService.getPosts().subscribe({
      next: (posts: IPost[]) => {
        this.posts = posts;
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
}
