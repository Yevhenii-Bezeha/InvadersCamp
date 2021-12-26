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

  constructor(private _commentsService: CommentsService) {}

  ngOnInit(): void {
    this.dataPrepare();
  }

  dataPrepare(): void {
    this.comments = this.post.comments;
  }

  onSubmit(form: NgForm): void {
    const comment: IComment = {
      message: form.value.message,
      postId: this.post._id,
    };
    this._commentsService.createComment(comment, this.post._id);
    form.onReset();
  }
}
