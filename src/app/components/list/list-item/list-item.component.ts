import { Component, Input } from '@angular/core';
import { IPost } from '@interfaces/IPost';
import { PostsService } from '@services/posts.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input() post: IPost;

  constructor(private postService: PostsService) {}

  onHeartClick(id: string) {
    this.postService.addLike(id);
  }
}
