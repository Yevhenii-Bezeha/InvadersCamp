import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '@services/posts.service';
import { IPost, IResPost } from '@interfaces/IPost';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  public post: IPost;
  private postId: string = '';

  constructor(
    private _route: ActivatedRoute,
    private _postService: PostsService
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.postId = params['id'];
    });
    this._postService.getPost(this.postId).subscribe((response: IResPost) => {
      this.post = response.data;
      console.log(this.post);
    });
  }

  onHeartClick(id: string) {
    console.log(id);
  }
}
