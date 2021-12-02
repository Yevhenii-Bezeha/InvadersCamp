import { IPost } from '@interfaces/IPost';
import { PostsService } from '@services/postsService';
import { Component, OnInit } from '@angular/core';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  posts: IPost[];
  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
    this.postService.postsChanged.subscribe((posts: IPost[]) => {
      this.posts = posts;
    });
  }
}
