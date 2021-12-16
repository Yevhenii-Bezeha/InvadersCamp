import { Component, OnInit } from '@angular/core';
import { PostsService } from '@services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  post: Object;

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.postService.getFromServer().subscribe((data) => {
      this.post = data;
    });
  }
}
