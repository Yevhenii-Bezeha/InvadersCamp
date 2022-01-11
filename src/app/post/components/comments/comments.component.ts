import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Comment, PostInf } from '@interfaces/postRelatedTypes';
import { CommentsService } from '../../services/comments.service';
import { BaseComponent } from '../../../shared/classes/BaseComponent';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @Input() post: PostInf;
  @Input() isAuthenticated: boolean = false;
  @Output() commentsChanged = new EventEmitter<void>();
  public comments: Comment[] = [];
  public commentToEdit: Comment = { message: '', postId: '', user: [] };

  constructor(private commentsService: CommentsService) {
    super();
  }

  ngOnInit(): void {
    this.dataPrepare();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  dataPrepare(): void {
    this.comments = this.post.comments;
  }

  onSubmitCreate(form: NgForm): void {
    const comment: any = {
      message: form.value.message,
      postId: this.post._id,
    };
    super.addObserver(
      this.commentsService
        .createComment(comment, this.post._id)
        .subscribe((data) => {
          this.commentsChanged.emit();
        })
    );
    form.onReset();
  }

  onSubmitEdit(form: NgForm): void {
    const comment: Comment = {
      ...this.commentToEdit,
      message: form.value.message,
    };
    super.addObserver(
      this.commentsService
        .updateComment(comment, this.post._id)
        .subscribe((data) => {
          this.commentsChanged.emit();
        })
    );
    this.commentToEdit = { message: '', postId: '', user: [] };
    form.onReset();
  }

  onClick(comment: Comment, action: 'delete' | 'edit'): void {
    if (action === 'delete') {
      super.addObserver(
        this.commentsService
          .deleteComment(comment._id, this.post._id)
          .subscribe((data) => {
            this.commentsChanged.emit();
          })
      );
      return;
    }
    this.commentToEdit = comment;
  }
}
