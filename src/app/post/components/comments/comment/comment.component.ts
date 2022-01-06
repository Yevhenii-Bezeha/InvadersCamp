import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '@interfaces/postRelatedTypes';
import { userId } from '@interfaces/userId';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() public comment: Comment = { message: '', postId: '', user: [] };
  @Output() public commentSelected: EventEmitter<'delete' | 'edit'> =
    new EventEmitter();
  userCommented: boolean = false;
  author: string | undefined = '';

  constructor() {}

  ngOnInit(): void {
    this.dataPrepare();
  }

  dataPrepare(): void {
    this.userCommented = this.comment.userId === userId;
    this.author = this.comment.user[0].name;
  }

  onDelete(): void {
    this.commentSelected.emit('delete');
  }

  onEdit(): void {
    this.commentSelected.emit('edit');
  }
}
