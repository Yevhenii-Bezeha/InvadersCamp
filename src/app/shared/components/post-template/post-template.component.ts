import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGetPost, ILike, IUser } from '@interfaces/IPost';
import { userId } from '@interfaces/userId';

@Component({
  selector: 'app-post-template',
  templateUrl: './post-template.component.html',
  styleUrls: ['./post-template.component.scss'],
})
export class PostTemplateComponent implements OnInit {
  @Input() public post: IGetPost;
  @Input() public isSliced: boolean = false;
  @Output() public postSelected: EventEmitter<void> = new EventEmitter();
  public newPost: IGetPost;
  public user: IUser;
  public countComment: number = 0;
  public likesCount: number;
  public userLike: ILike | undefined;
  public tags: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.prepareData();
  }

  prepareData(): void {
    this.user = this.post.user[0];
    this.countComment = this.post.comments.length;
    this.tags = this.post.tags;
    const likesArr: ILike[] = this.post.likes.filter((el: ILike) => el.isLiked);
    this.likesCount = likesArr.length;
    this.userLike = this.post.likes.find((el: ILike) => {
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
