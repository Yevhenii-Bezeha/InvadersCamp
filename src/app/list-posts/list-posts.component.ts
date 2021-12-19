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

  private sub: Subscription;

  constructor(private _postService: PostsService) {}

  ngOnInit(): void {
    this._postService.getPosts();
    this.sub = this._postService.postsChanged$.subscribe(
      (posts: IPost[]) => (this.posts = posts)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onPostSelected(post: IPost) {
    this._postService.addLikes(post._id, { likes: post.likes + 1 });
    this._postService.getPosts();
  }
}
