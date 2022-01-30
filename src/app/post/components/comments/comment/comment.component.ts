import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '@interfaces/postRelatedTypes';
import { LocalStorageService } from '@services/localStorage.service';

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
  ё;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.dataPrepare();
  }

  dataPrepare(): void {
    const user = this.localStorageService.getUser();
    const userId = user?._id;
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
