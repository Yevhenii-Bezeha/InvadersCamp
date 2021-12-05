import { IPost } from '@interfaces/IPost';
import { PostsService } from '@services/postsService';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  public posts: IPost[];

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
