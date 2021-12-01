import { PostsService } from './../../../services/postsService';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss'],
})
export class SidebarNavComponent implements OnInit {
  onAddClick() {
    this.postService.showModal();
  }

  constructor(private postService: PostsService) {}

  ngOnInit(): void {}
}
