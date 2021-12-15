import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '@services/posts.service';
import { IPost } from '@interfaces/IPost';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  public posts: IPost[] = [];

  private sub: Subscription;

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
    this.sub = this.postService.postsChanged$.subscribe(
      (posts: IPost[]) => (this.posts = posts)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
