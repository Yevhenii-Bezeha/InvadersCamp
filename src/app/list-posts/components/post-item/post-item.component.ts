import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPost } from '@interfaces/IPost';
import { PostsService } from '@services/posts.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent {
  @Input() post: IPost;
  @Output() postSelected: EventEmitter<void> = new EventEmitter();

  constructor(private _postService: PostsService) {}

  onHeartClick(id: string, likesCount: number) {
    this.postSelected.emit();
  }
}
