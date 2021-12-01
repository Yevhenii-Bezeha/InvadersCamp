import { PostsService } from './../../services/postsService';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  handleBackdropClick(e: MouseEvent) {
    if (e.target !== e.currentTarget) return;
    this.postService.showModal();
  }

  constructor(private postService: PostsService) {}

  ngOnInit(): void {}
}
