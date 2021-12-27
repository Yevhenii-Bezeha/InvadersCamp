import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComment } from '@interfaces/IPost';
import { userId } from '@interfaces/userId';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() public comment: IComment = { message: '', postId: '' };
  @Output() public commentSelected: EventEmitter<'delete' | 'edit'> =
    new EventEmitter();
  userCommented: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.userCommented = this.comment.userId === userId;
  }

  onDelete(): void {
    this.commentSelected.emit('delete');
  }

  onEdit(): void {
    this.commentSelected.emit('edit');
  }
}
