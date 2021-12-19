import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostsService } from '@services/posts.service';
import { IPost } from '@interfaces/IPost';
import { ModalService } from '@services/modal.service';
import { FormService } from '@services/form.service';
import { emptyPost } from '@interfaces/emptyPost';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  public post: IPost = emptyPost;
  isShowModal = true;
  private _postId: string = '';
  private _sub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _postService: PostsService,
    private _modalService: ModalService,
    private _formService: FormService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this._postId = params['id'];
    });
    this._postService.getPost(this._postId);
    this._sub = this._postService.postChanged$.subscribe(
      (post: IPost) => (this.post = post)
    );
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  onHeartClick(id: string, likesCount: number) {
    this._postService.updatePost(id, { likes: likesCount + 1 });
  }

  onEditClick() {
    this._modalService.toggleModal();
    this._formService.openEditForm();
  }

  onDeleteClick(id: string) {
    this._postService.deletePost(id);
    this._router.navigateByUrl('posts').then();
  }
}
