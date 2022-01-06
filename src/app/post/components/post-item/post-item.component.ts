import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Like, PostInf } from '@interfaces/postRelatedTypes';
import { FormService } from '@services/form.service';
import { url } from '@interfaces/routes';
import { LikesService } from '@services/likes.service';
import { emptyPost } from '@interfaces/emptyPost';
import { userId } from '@interfaces/userId';
import { PostHttpService } from '../../services/post-http.service';
import { BaseComponent } from '../../../shared/classes/BaseComponent';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  public post: PostInf[] = [];
  public copyPost: PostInf = emptyPost;
  public isFetching: boolean = false;
  public canEditPost: boolean = false;
  private postId: string = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostHttpService,
    private likesService: LikesService,
    private formService: FormService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.isFetching = true;
    this.getPost();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getPost(): void {
    super.addObserver(
      this.route.params.subscribe(
        (params: Params) => (this.postId = params['id'])
      )
    );
    super.addObserver(
      this.postService.getPost(this.postId).subscribe((post: PostInf[]) => {
        this.post = post;
        this.copyPost = post[0];
        this.canEditPost = this.post[0].userId === userId;
        this.isFetching = false;
      })
    );
  }

  addLike(likesArr: Like[], postId: string): void {
    console.log(123);
    const like: Like | undefined = this.likesService.isUserLiked(likesArr);
    if (!like) {
      const like: Like = {
        postId: postId,
        isLiked: true,
      };
      super.addObserver(
        this.likesService.createLike(like, postId).subscribe((data) => {
          this.getPost();
        })
      );
    } else {
      super.addObserver(
        this.likesService
          .toggleLike(like?._id, { isLiked: like.isLiked }, postId)
          .subscribe((data) => {
            this.getPost();
          })
      );
    }
  }

  onEditClick(): void {
    this.formService.openEditForm(this.copyPost);
  }

  onDeleteClick(id: string): void {
    super.addObserver(this.postService.deletePost(id).subscribe());
    this.router.navigateByUrl(url.posts).then();
  }

  commentsChanged() {
    this.getPost();
  }
}
