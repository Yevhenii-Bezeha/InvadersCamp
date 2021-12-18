import { Component, Input } from '@angular/core';
import { IPost } from '@interfaces/IPost';
import { PostsService } from '@services/posts.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent {
  @Input() post: IPost;

  constructor(private postService: PostsService) {}

  onHeartClick(id: string) {
    console.log(123);
    // this.postService.addLike(id);
  }
}
