import { Component, Input } from '@angular/core';
import { IPost } from '@interfaces/IPost';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent {
  @Input() post: IPost;

  constructor() {}

  onHeartClick(id: string) {
    console.log(123);
    // this.postService.addLike(id);
  }
}
