import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPost, IResponse } from '../core/models/IPost';
import { Subscription } from 'rxjs';
import { PostsService } from '../core/services/posts.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss'],
})
export class ListPostsComponent implements OnInit, OnDestroy {
  public posts: IPost[] = [];

  private sub: Subscription;

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data: IResponse) => {
      this.posts = data.data;
    });
    this.sub = this.postService.postsChanged$.subscribe(
      (posts: IPost[]) => (this.posts = posts)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
