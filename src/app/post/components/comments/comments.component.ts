import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IComment, IGetPost } from '@interfaces/IPost';
import { CommentsService } from '../../comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() post: IGetPost;
  public comments: IComment[];
  public error: string = '';
  public commentToEdit: IComment = { message: '', postId: '' };

  constructor(private _commentsService: CommentsService) {}

  ngOnInit(): void {
    this.dataPrepare();
  }

  dataPrepare(): void {
    this.comments = this.post.comments;
  }

  onSubmitCreate(form: NgForm): void {
    const comment: IComment = {
      message: form.value.message,
      postId: this.post._id,
    };
    this._commentsService.createComment(comment, this.post._id);
    form.onReset();
  }

  onSubmitEdit(form: NgForm): void {
    const comment: IComment = {
      ...this.commentToEdit,
      message: form.value.message,
    };
    this._commentsService.updateComment(comment, this.post._id);
    this.commentToEdit = { message: '', postId: '' };
    form.onReset();
  }

  onClick(comment: IComment, action: 'delete' | 'edit'): void {
    if (action === 'delete') {
      this._commentsService.deleteComment(comment._id, this.post._id);
      return;
    }
    this.commentToEdit = comment;
  }
}
