import { PostsService } from '@services/postsService';
import { IPost } from '@interfaces/IPost';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input('post') post: IPost;
  constructor(private postService: PostsService) {}

  ngOnInit(): void {}

  onHeartClick(id: string) {
    this.postService.addLike(id);
  }
}
