import { ModalService } from './../../services/modalService';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  handleBackdropClick(e: MouseEvent) {
    if (e.target !== e.currentTarget) return;
    this.modalService.showModal();
  }

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}
}
