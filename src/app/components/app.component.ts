import { PostsService } from './../services/postsService';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') sidebar: MatDrawer;
  isShowModal = false;

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.isShowModal = this.postService.isShowModal;
    this.postService.isShowModalChanged.subscribe((isShowModal) => {
      this.isShowModal = isShowModal;
    });
  }
}
