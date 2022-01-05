import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Like, PostInf, User } from '@interfaces/postRelatedTypes';
import { userId } from '@interfaces/userId';

@Component({
  selector: 'app-post-template',
  templateUrl: './post-template.component.html',
  styleUrls: ['./post-template.component.scss'],
})
export class PostTemplateComponent implements OnInit {
  @Input() public post: PostInf;
  @Input() public isSliced: boolean = false;
  @Output() public postSelected: EventEmitter<void> = new EventEmitter();
  public newPost: PostInf;
  public user: User;
  public countComment: number = 0;
  public likesCount: number;
  public userLike: Like | undefined;
  public tags: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.prepareData();
  }

  prepareData(): void {
    this.user = this.post.user[0];
    this.countComment = this.post.comments.length;
    this.tags = this.post.tags;
    const likesArr: Like[] = this.post.likes.filter((el: Like) => el.isLiked);
    this.likesCount = likesArr.length;
    this.userLike = this.post.likes.find((el: Like) => {
      if (el.userId === userId) {
        return el;
      }
      return undefined;
    });
  }

  onHeartClick(): void {
    this.postSelected.emit();
  }
}
